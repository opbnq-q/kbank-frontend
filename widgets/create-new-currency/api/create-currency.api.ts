export const createCurrency = async (body: Omit<Currency, 'id'>) => {
    const { $ofetch } = useNuxtApp()

    return $ofetch<ServerResponseTemplate>(`/currency/`, {
        method: "POST",
        body
    })
}