export default defineNuxtPlugin(() => {
    const loadingModal = useLoadingModal()

    const config = useRuntimeConfig()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string,
        onRequest: loadingModal.summon,
        onResponse: loadingModal.hide,
        onRequestError: loadingModal.hide,
        onResponseError: loadingModal.hide,
        headers: {
            'Authorization': import.meta.client ? sessionStorage?.getItem('token') || '' : ''
        }
    })
    return {
        provide: {
            ofetch
        }
    }
})
