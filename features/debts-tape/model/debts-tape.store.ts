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
            this.debts = this.debts.reduce((acc: Debt[], d: Debt) => {
                if (acc.find(accD => d.id == accD.id)) {
                    return acc;
                }
                return [...acc, d]
            }, [] as Debt[])
        },
        changeStatusById(id: number, newStatus: DebtStatus) {
            this.debts = this.debts.map(d => ({
                ...d,
                status: id == d.id? newStatus : d.status
            }))
        }
    }
})