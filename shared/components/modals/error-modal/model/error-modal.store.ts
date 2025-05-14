export interface ErrorModalStoreState {
    show: boolean
    message: string | number
}
export const useErrorModal = defineStore('error-modal', {
    state: (): ErrorModalStoreState => ({
        show: false,
        message: ''
    }),
    actions: {
        summon(message: string | number) {
            this.show = true
            this.message = message
        }
    },
})
