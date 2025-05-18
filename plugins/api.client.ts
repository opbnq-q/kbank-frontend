import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtPlugin(async () => {
    const loadingModal = useLoadingModal()
    const config = useRuntimeConfig()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest: loadingModal.summon,
        onResponse: loadingModal.hide,
        onRequestError: loadingModal.hide,
        onResponseError: loadingModal.hide,
        headers: {
            'Authorization': await TokenManager.get() as string
        }
    })
    return {
        provide: {
            ofetch
        }
    }
})