export const getMyOwnedDebts = async (page: number) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch<ServerResponseTemplate<{
        data: Debt[],
        meta: {
            totalPages: number
        }
    }>>('/debts/my-owned', {
        query: {
            page
        }
    })
    if (result.status === 'success') {
        return result.data
    }
}