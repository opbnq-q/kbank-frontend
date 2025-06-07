import { io, Socket } from "socket.io-client"

export interface WsResponse {
    balance: number
    debts: Debt[]
    requests: CompleteRequest[]
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const { public: { wsBase } } = useRuntimeConfig()
    const { $ofetch } = useNuxtApp()

    const errorModal = useErrorModal()
    const profileStore = useProfileStore()
    const debtsTapeStore = useDebtsTapeStore()
    const notificationsStore = useNotificationsStore()
    const completeRequestsTape = useCompleteRequestsTapeStore()

    let ws: Socket | null = null

    const initializeWebSocket = async () => {
        const tokenManager = useTokenManager()
        const token = await tokenManager.get()
        if (!token) {
            setTimeout(initializeWebSocket, 1000)
            return
        }

        ws = io(wsBase, {
            auth: { token },
            transports: ["websocket"],
            autoConnect: false
        })

        ws.on("connect", () => {
            ws?.emit("my")
        })

        ws.on("update", (response: WsResponse) => {
            profileStore.patchBalance(response.balance)
            debtsTapeStore.addDebts(response.debts)
            response.debts.forEach(debt => {
                notificationsStore.summon({
                    message: 'You have got a new debt!',
                    link: `/debts/${debt.id}`
                })
                $ofetch(`debts/view/${debt.id}`, {
                    method: 'PATCH'
                })
            })
            const requests = response.requests.reduce((acc, req) => {
                const debtId = req.debt.id
                if (!acc[debtId]) acc[debtId] = []
                acc[debtId].push(req)
                return acc
            }, {} as Record<number, CompleteRequest[]>)
            for (let key in requests) {
                const k = Number(key)
                requests[k].forEach(request => {
                    notificationsStore.summon({
                        message: 'You have got a new complete request!',
                        link: `/complete-requests/${request.id}`
                    })
                    $ofetch(`/complete-requests/view/${request.id}`, {
                        method: 'PATCH'
                    })
                })
                completeRequestsTape.addCompleteRequests(k, requests[k])
            }
        })

        ws.on("connect_error", (err: Error) => {
            errorModal.summon(err.message)
        })

        ws.connect()
    }

    initializeWebSocket()

    return {
        provide: {
            ws
        }
    }
})