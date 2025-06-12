import { createCurrency } from "../api/create-currency.api"

export interface CreateNewCurrencyStoreState {
    show: boolean
    title: string
    description: string
    standardUnits: number
    errors: {
        title: string
        description: string
        standardUnits: string
    }
}

export const useCreateNewCurrencyStore = defineStore('create-new-currency', {
    state: (): CreateNewCurrencyStoreState => ({
        show: false,
        description: '',
        standardUnits: 1,
        title: '',
        errors: {
            description: '',
            standardUnits: '',
            title: ''
        }
    }),
    actions: {
        summon() {
            this.show = true
        },
        hide() {
            this.show = false
        },
        async submit(t: I18nGetter) {
            if (!this.validate(t)) return;
            const notifications = useNotificationsStore()
            const result = await createCurrency({
                standardUnits: this.standardUnits,
                title: this.title,
                description: this.description
            })
            if (result.status == 'success') {
                notifications.summon({
                    message: "You have created a new currency!"
                })
                this.hide()
                this.$reset()
            }
         },
        validate(t: I18nGetter) {
            if (this.title.length < 1 || this.title.length > 500) {
                this.errors.title = t('createNewCurrency.errors.title')
                return false
            }
            if (this.description.length > 500) {
                this.errors.title = t('createNewCurrency.errors.description')
                return false
            }
            if (this.standardUnits < 1) {
                this.errors.standardUnits = t('createNewCurrency.errors.standardUnits')
                return false
            }
            return true
        }
    }
})