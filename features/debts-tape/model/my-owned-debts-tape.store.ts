import { getMyOwnedDebts } from "../api/get-my-owned-debts.api"

export interface MyOwnedDebtsTapeStoreState {
    myOwnedDebts: Debt[]
    totalPages: number
    page: number
}

export const useOwnedDebtsTapeStore = defineStore('my-owned-debt-store', {
    state: (): MyOwnedDebtsTapeStoreState => ({
        myOwnedDebts: [],
        page: 0,
        totalPages: 0,
    }),
    actions: {
        async loadMyOwnedDebts() {
           const result = await getMyOwnedDebts(++this.page)
           if (result) {
                this.totalPages = result.meta.totalPages
                this.addDebts(result.data)
           }
        },
        addDebts(debts: Debt[]) {
            this.myOwnedDebts = [...debts, ...this.myOwnedDebts];
            this.unique()
        },
        unique() {
            this.myOwnedDebts = this.myOwnedDebts.reduce((acc: Debt[], d: Debt) => {
                if (acc.find(accD => d.id == accD.id)) {
                    return acc;
                }
                return [...acc, d]
            }, [] as Debt[])
        },
        changeStatusById(id: number, newStatus: DebtStatus) {
            this.myOwnedDebts = this.myOwnedDebts.map(d => ({
                ...d,
                status: id == d.id? newStatus : d.status
            }))
        },
    }
})