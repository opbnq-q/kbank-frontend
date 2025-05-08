import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) {
        const token = TokenManager.get()
        if (!token) return navigateTo('/auth')
    }
})
