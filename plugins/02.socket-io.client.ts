import { io, Socket } from "socket.io-client"
import { TokenManager } from "~/shared/lib/token-manager.lib"

export interface WsResponse {
    balance: number
    debts: Debt[]
} 

export default defineNuxtPlugin(async (nuxtApp) => {
    const { public: { wsBase } } = useRuntimeConfig()
    const token = await TokenManager.get()
    const { $ofetch } = useNuxtApp()

    const ws: Socket = io(wsBase, {
        auth: { token },
        transports: ["websocket"],
        autoConnect: false
    })

    const errorModal = useErrorModal()
    const profileStore = useMyProfile()

    ws.on("connect", () => {
        ws.emit("my")
    })

    ws.on("update", (response: WsResponse) => {
        profileStore.patchBalance(response.balance)
        profileStore.addDebts(response.debts)
        response.debts.forEach(debt => {
            $ofetch(`debts/view/${debt.id}`, {
                method: 'PATCH'
            }).catch(console.error)
        })
    })

    ws.on("connect_error", (err: Error) => {
        console.error(err)
        errorModal.summon(err.message)
    })

    ws.connect()

    return {
        provide: {
            ws
        }
    }
})