import { getCurrencies } from "../api/get-currencies.api"

export interface CreateNewDebtCurrencyStoreState {
    currencyId: number
    currencies: Currency[],
    search: string
    totalPages: number
    page: number
    price: number
    debounceTimeout: ReturnType<typeof setTimeout> | null
}

export const useCreateNewDebtCurrencyStore = defineStore('create-new-debt-currency', {
    state: (): CreateNewDebtCurrencyStoreState => ({
        currencyId: 0,
        currencies: [],
        totalPages: 0,
        search: '',
        price: 0,
        page: 0,
        debounceTimeout: null
    }),
    actions: {
        async fetchCurrencies() {
            const result = await getCurrencies(this.search, this.page)
            if (result.status == 'success') {
                this.totalPages = result.data.meta.totalPages
                this.currencies = [...this.currencies, ...result.data.data].reduce((acc: Currency[], el: Currency) => {
                    if (acc.find(i => i.id == el.id)) return acc;
                    return [...acc, el]
                }, [] as Currency[])
            }
        },
        handleInput() {
            this.page = 1
            this.currencies = []
            if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                if (this.search) this.fetchCurrencies()
            }, 400)
        }
    }
})