export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const ofetch = $fetch.create({
        baseURL: config.public.apiBase as string
    })
    return {
        provide: {
            ofetch
        }
    }
})
