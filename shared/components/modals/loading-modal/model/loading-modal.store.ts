export interface LoadingModalStoreState {
    show: boolean
}
export const useLoadingModal = defineStore('loading-modal', {
    state: (): LoadingModalStoreState => ({
        show: false,
    }),
    actions: {
        summon() {
            this.show = true
        },
        hide() {
            this.show = false
        }
    },
})
