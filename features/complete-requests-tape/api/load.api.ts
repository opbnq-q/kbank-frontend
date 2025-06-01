export const load = async (debtId: number) => {
    const { $ofetch } = useNuxtApp()

    const result = await $ofetch<ServerResponseTemplate<CompleteRequest[]>>(`/complete-requests/by-debt/${debtId}`) 
    return result
}