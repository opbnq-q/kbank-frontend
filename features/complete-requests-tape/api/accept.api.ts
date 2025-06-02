export const accept = async (id: number) => {
    const { $ofetch } = useNuxtApp()
    
    const result = await $ofetch<ServerResponseTemplate>(`/complete-requests/accept/${id}`, {
        method: 'PATCH'
    })

    return result.status
}