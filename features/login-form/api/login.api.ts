export const loginApi = async (data: LoginData) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch<ServerResponseTemplate<string>>('/auth/login', {
        method: "POST",
        body: data,
    })
    return result
}