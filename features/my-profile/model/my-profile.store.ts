import { TokenManager } from "~/shared/lib/token-manager.lib";
import type { FullUser } from "~/shared/types/full-user.type";
import { Role } from "~/shared/types/role.type";
import { getMy } from "../api/get-my.api";

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
    }
})