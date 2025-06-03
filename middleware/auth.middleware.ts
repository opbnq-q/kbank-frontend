const tokenManager = useTokenManager()

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;
    if (!tokenManager.get()) return navigateTo('/auth');
})
