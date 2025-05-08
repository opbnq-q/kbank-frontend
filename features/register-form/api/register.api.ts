import type { ServerResponseTemplate } from "~/shared/types/server-response-template.type"
import type { RegisterData } from "../types/register-data.type"

export const registerApi = async <T=unknown>(data: RegisterData) => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<T>>('/auth/register', {
            method: 'POST',
            body: data
        })
        return result
    } catch(e) {
        errorModal.summon((e as any).statusCode)
    }

}