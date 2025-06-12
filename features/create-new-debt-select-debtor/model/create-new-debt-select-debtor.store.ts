
export interface CreateNewDebtSelectDebtorStoreState {
    debtor: null | FullUser
    debtors: FullUser[]
    search: string
    totalPages: number
    page: number
    debounceTimeout: ReturnType<typeof setTimeout> | null
}

export const useCreateNewDebtSelectDebtorStore = defineStore('create-new-debt-select-debtor-state', {
    state: (): CreateNewDebtSelectDebtorStoreState => ({
        debtor: null,
        debtors: [],
        search: '',
        totalPages: 0,
        page: 0,
        debounceTimeout: null,
    }),

    actions: {
        async fetchDebtors() {
            const result = await getDebtors(this.search, this.page)
            if (result.status === 'success') {
                this.totalPages = result.data.meta.totalPages
                this.debtors = [...this.debtors, ...result.data.data].reduce((acc: FullUser[], el: FullUser) => {
                    if (acc.find(i => i.id === el.id)) return acc
                    return [...acc, el]
                }, [] as FullUser[])
            }
        },
        handleInput() {
            this.page = 1
            this.debtors = []
            if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
            this.debounceTimeout = setTimeout(() => {
                if (this.search) this.fetchDebtors()
            }, 400)
        }
    }
})