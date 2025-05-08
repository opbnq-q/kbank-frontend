import type { LoginData } from "../types/login-data.type"

export const loginApi = async <T = unknown>(data: LoginData) => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<T>>('/auth/login', {
            method: "POST",
            body: data,
        })
        return result
    } catch (e) {
        errorModal.summon((e as any).statusCode)
    }
}