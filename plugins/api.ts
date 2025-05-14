export default defineNuxtPlugin((nuxtApp) => {
    const loadingModal = useLoadingModal()

    const config = useRuntimeConfig()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest: loadingModal.summon,
        onResponse: loadingModal.hide,
        onRequestError: loadingModal.hide,
        onResponseError: loadingModal.hide
    })
    return {
        provide: {
            ofetch
        }
    }
})
