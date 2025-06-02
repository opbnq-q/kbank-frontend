export const deny = async (id: number) => {
    const { $ofetch } = useNuxtApp()

    return (await $ofetch<ServerResponseTemplate>(`/debts/deny/${id}`, {
        method: 'PATCH'
    })).status
}