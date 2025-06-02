export const accept = async (id: number) => {
    const { $ofetch } = useNuxtApp()

    return (await $ofetch<ServerResponseTemplate>(`/debts/accept/${id}`, {
        method: 'PATCH'
    })).status
}