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
        async catch<T extends (...args: any[]) => any>(fn: T, { message, args }: { message: string, args: Parameters<T> }) {
            let m: string;
            try {
                fn(args)
            } catch {
                this.summon(message)
            }
        },
        summon(message: string) {
            this.show = true
            this.message = message
        }
    },
})
