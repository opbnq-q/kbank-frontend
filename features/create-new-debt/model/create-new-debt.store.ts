export interface CreateNewDebtStoreState {
    title: string
    description?: string
    price: number
    currencyId: number
    debtorId: number
}

export const useCreateNewDebt = defineStore('create-new-debt', {
    state: (): CreateNewDebtStoreState => ({
        currencyId: 0,
        debtorId: 0,
        price: 0,
        title: '',
        description: ''
    }),

})