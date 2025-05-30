export const getMyDebts = async (page: number) => {
    const { $ofetch } = useNuxtApp()

        const result = await $ofetch<ServerResponseTemplate<{
            data: Debt[],
            meta: {
                totalPages: number
            }
        }>>('/debts/my', {
            query: {
                page
            }
        })
        if (result.status === 'success') {
            return result.data
        }
}

