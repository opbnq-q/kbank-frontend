import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;
    if (!TokenManager.get()) return navigateTo('/auth');
})
