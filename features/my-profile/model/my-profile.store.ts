import { TokenManager } from "~/shared/lib/token-manager.lib";

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
            this.$patch(await getMy() as MyProfileStoreState)
        },

        async logout() {
            await TokenManager.remove()
            navigateTo('/auth')
        },

        patchBalance(b: number) {
            this.balance = b
        },

    }
})