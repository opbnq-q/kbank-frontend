export const registerApi = async (data: RegisterData) => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<string>>('/auth/register', {
            method: 'POST',
            body: data
        })
        return result
    } catch(e) {
        errorModal.summon((e as any).statusCode)
    }

}