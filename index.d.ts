import type { $Fetch } from 'ofetch'
import type { Socket } from 'socket.io-client'

declare module "#app" {
    interface NuxtApp {
        $ofetch: $Fetch
        $ws: Socket
    }
}