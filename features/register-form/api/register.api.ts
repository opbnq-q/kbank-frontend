export const registerApi = async (data: RegisterData) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch<ServerResponseTemplate<string>>('/auth/register', {
        method: 'POST',
        body: data
    })
    return result
}