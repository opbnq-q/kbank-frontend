export const getCurrencies = async (search: string, page: string | number) => {
    const { $ofetch } = useNuxtApp()

    return await $ofetch<ServerResponseTemplate<{ data: Currency[], meta: { totalPages: number } }>>(`/currency?search=${search}&page=${page}`)
}