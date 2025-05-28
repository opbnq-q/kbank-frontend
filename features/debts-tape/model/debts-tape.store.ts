export interface DebtsTapeStoreState {
    debts: Debt[]
    totalPages: number
    page: number
}

export const useDebtsTapeStore = defineStore('debt-store', {
    state: (): DebtsTapeStoreState => ({
        debts: [],
        page: 0,
        totalPages: 0
    }),
    actions: {
        async load() {
           const result = await getMyDebts(++this.page)
           if (result) {
                this.totalPages = result.meta.totalPages
                this.addDebts(result.data)
           }
        },
        addDebts(debts: Debt[]) {
            this.debts = [...debts, ...this.debts]
            this.unique()
        },
        unique() {
            this.debts = Array.from(new Set(this.debts))
        }
    }
})