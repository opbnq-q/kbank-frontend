import { TokenManager } from "~/shared/lib/token-manager.lib"

export default defineNuxtPlugin(async () => {
    const loadingModal = useLoadingModal()
    const config = useRuntimeConfig()
    const errorModal = useErrorModal()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest: async ({ options }) => {
            const token = await TokenManager.get()
            if (token) options.headers.append('Authorization', token);
        },
        onResponse: loadingModal.hide,
        onRequestError: ({ error: { name } }) => {
            loadingModal.hide()
            errorModal.summon(name)
        },
        onResponseError: ({ response: { status } }) => {
            loadingModal.hide()
            errorModal.summon(status)
        },
    })
    return {
        provide: {
            ofetch
        }
    }
})