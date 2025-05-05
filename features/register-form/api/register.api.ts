import type { RegisterData } from "../types/register-data.type"

export const registerApi = async (data: RegisterData) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch('/auth/register', {
        method: 'POST',
        body: data
    })

    console.log(result)
    return result
}