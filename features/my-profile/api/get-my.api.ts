export const getMy = async () => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<FullUser>>('/users/my')
        if (result.status === 'success') {
            console.log(result.data)
            return result.data
        }
    } catch (e) {
        errorModal.summon((e as any).statusCode)
    }
}

