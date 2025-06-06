export const getDebtors = async (search: string, page: number | string) => {
    const { $ofetch } = useNuxtApp()

    return await $ofetch<ServerResponseTemplate<{ data: FullUser[], meta: { totalPages: number } }>>(`/users?page=${page}&search=${search}`)
}