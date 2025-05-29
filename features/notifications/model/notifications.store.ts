import type { Notification } from "#imports"

export interface NotificationsStoreState {
    notifications: Notification[]
}

export const useNotificationsStore = defineStore('notifications-store', {
    state: (): NotificationsStoreState => ({
        notifications: [],
    }),
    getters: {
        len(state) {
            return state.notifications.length
        }
    },
    actions: {
        summon(n: Notification) {
            this.notifications.push(n)
            setTimeout(() => {
                this.remove(n)
            }, 4000)
        },
        remove(n: Notification) {
            this.notifications = this.notifications.filter(i => i != n)
        }
    }
})