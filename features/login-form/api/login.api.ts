import type { LoginData } from "../types/login-data.type"

export const loginApi = async (data: LoginData) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch('/auth/login', {
        method: "POST",
        body: data,
    })

    console.log(result)

    return result
}