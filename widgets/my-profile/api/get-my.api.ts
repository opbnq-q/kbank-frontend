export const getMy = async () => {
    const { $ofetch } = useNuxtApp()
    const result = await $ofetch<ServerResponseTemplate<FullUser>>('/users/my')
    if (result.status === 'success') {
        return result.data
    }
}

