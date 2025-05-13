export interface ErrorModalStoreState {
    show: boolean
    message: string
}
export const useErrorModal = defineStore('error-modal', {
    state: (): ErrorModalStoreState => ({
        show: false,
        message: ''
    }),
    actions: {
        summon(message: string) {
            this.show = true
            this.message = message
        }
    },
})
