import type { $Fetch } from 'ofetch'
import type { Socket } from 'socket.io-client'
import type { ObjectDirective } from 'vue'

declare module "#app" {
    interface NuxtApp {
        $ofetch: $Fetch
        $ws: Socket
    }
    interface GlobalDirectives {
        'beyond-click': ObjectDirective<HTMLElement, (event: MouseEvent) => void>
    }
}