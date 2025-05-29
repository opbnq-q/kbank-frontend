export const getMy = async () => {
    const { $ofetch } = useNuxtApp()
    const errorModal = useErrorModal()

    try {
        const result = await $ofetch<ServerResponseTemplate<FullUser>>('/users/my')
        if (result.status === 'success') {
            return result.data
        }
    } catch (e) {
        errorModal.summon((e as any).statusCode)
    }
}

