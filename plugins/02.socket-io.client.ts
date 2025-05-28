import { io, Socket } from "socket.io-client"
import { TokenManager } from "~/shared/lib/token-manager.lib"


export interface WsResponse {
    balance: number
    debts: Debt[]
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const { public: { wsBase } } = useRuntimeConfig()
    const { $ofetch } = useNuxtApp()

    const errorModal = useErrorModal()
    const profileStore = useMyProfile()
    const debtsTapeStore = useDebtsTapeStore()
    const notificationsStore = useNotificationsStore()

    let ws: Socket | null = null

    const initializeWebSocket = async () => {
        const token = await TokenManager.get()
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
                    message: 'You have new debt!',
                    link: `/debts/${debt.id}`
                })
                $ofetch(`debts/view/${debt.id}`, {
                    method: 'PATCH'
                }).catch(console.error)
            })
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