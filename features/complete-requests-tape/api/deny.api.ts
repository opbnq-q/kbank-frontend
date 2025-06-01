export const deny = async (id: number) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch<ServerResponseTemplate>(`/complete-requests/deny/${id}`, {
        method: 'PATCH'
    })

    return result.status
}