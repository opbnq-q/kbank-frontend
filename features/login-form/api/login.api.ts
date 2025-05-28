export const loginApi = async (data: LoginData) => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<string>>('/auth/login', {
            method: "POST",
            body: data,
        })
        return result
    } catch (e) {
        errorModal.summon((e as any).statusCode)
    }
}