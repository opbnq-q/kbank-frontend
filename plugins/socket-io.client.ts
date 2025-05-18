import { io, Socket } from "socket.io-client"
import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtPlugin(async (nuxtApp) => {
    const { public: { wsBase } } = useRuntimeConfig()
    const token = await TokenManager.get()

    const ws: Socket = io(wsBase, {
        auth: { token },
        transports: ["websocket"],
        autoConnect: false
    })

    const errorModal = useErrorModal()

    ws.on("connect", () => {
        ws.emit("my")
    })

    ws.on("update", (...payload: any[]) => {
        console.log("🔄 update received →", ...payload)
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