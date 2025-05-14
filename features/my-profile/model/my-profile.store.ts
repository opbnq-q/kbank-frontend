import { TokenManager } from "~/shared/lib/token-manager.lib";
import type { FullUser } from "~/shared/types/full-user.type";
import { Role } from "~/shared/types/role.type";

export interface MyProfileStoreState extends FullUser {

}


export const useMyProfile = defineStore('my-profile', {
    state: (): MyProfileStoreState => ({
        debts: [],
        email: '',
        firstName: '',
        hash: '',
        id: 0,
        lastName: '',
        ownedDebts: [],
        role: Role.USER,
        balance: 0
    }),
    actions: {
        async load() {
            const { $ofetch } = useNuxtApp()
            const errorModal = useErrorModal()

            try {
                const result = await $ofetch<ServerResponseTemplate<FullUser>>('/users/my')
                if (result.status === 'success') {
                    this.$patch(result.data)
                }
            } catch (e) {
                errorModal.summon((e as any).statusCode)
            }
        },

        async logout() {
            await TokenManager.remove()
            navigateTo('/auth')
        }
    }
})