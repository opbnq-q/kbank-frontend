import type { Notification } from "../types/notification.type"

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
        add(n: Notification) {
            this.notifications.push(n)
        }
    }
})