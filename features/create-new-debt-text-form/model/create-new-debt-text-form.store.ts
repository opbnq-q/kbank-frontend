export interface CreateNewDebtStoreState {
    title: string
    description?: string
}

export const useCreateNewDebtTextFormStore = defineStore('create-new-debt-text-form', {
    state: (): CreateNewDebtStoreState => ({
        title: '',
        description: ''
    }),

})