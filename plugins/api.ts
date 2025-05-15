import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtPlugin(() => {
    const loadingModal = useLoadingModal()
    const config = useRuntimeConfig()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest({ options }) {
            loadingModal.summon()
            if (import.meta.client) {
                const token = TokenManager.get() || ''
                if (token) {
                    options.headers.append('Authorization', token as string)
                }
            }
        },
        onResponse: loadingModal.hide,
        onRequestError: loadingModal.hide,
        onResponseError: loadingModal.hide,
    })
    return {
        provide: {
            ofetch
        }
    }
})