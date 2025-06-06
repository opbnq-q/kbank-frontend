export const createNewDebt = async (body: {debtorId: number, price: number, currencyId: number, title: string, description?: string}) => {
    const { $ofetch } = useNuxtApp()

    return await $ofetch<ServerResponseTemplate<Debt>>(`/debts`, {
        method: "POST",
        body
    })
}