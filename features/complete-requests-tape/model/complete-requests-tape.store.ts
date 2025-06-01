import { accept } from "../api/accept.api"
import { deny } from "../api/deny.api"
import { load } from "../api/load.api"

export interface CompleteRequestsTapeStoreState {
    debtIdCompleteRequestMap: Map<number, CompleteRequest[]>
}

export const useCompleteRequestsTapeStore = defineStore('complete-requests-tape', {
    state: (): CompleteRequestsTapeStoreState => ({
        debtIdCompleteRequestMap: new Map
    }),
    actions: {
        addCompleteRequests(debtId: number, requests: CompleteRequest[]) {
            if (this.debtIdCompleteRequestMap.has(debtId)) {
                this.debtIdCompleteRequestMap.set(debtId, [...this.debtIdCompleteRequestMap.get(debtId) as [], ...requests])
            } else {
                this.debtIdCompleteRequestMap.set(debtId, requests)
            }
            this.unique(debtId)
        },
        updateCompleteRequestStatus(debtId: number, requestId: number, newStatus: CompleteRequestStatus) {
            if (this.debtIdCompleteRequestMap.has(debtId)) {
                this.debtIdCompleteRequestMap.set(debtId, this.debtIdCompleteRequestMap.get(debtId)!.map(el => ({
                    ...el,
                    status: el.id === requestId? newStatus : el.status
                })))
            }
        },
        async deny(debtId: number, requestId: number) {
            const result = await deny(requestId)
            if (result == 'success') {
                this.updateCompleteRequestStatus(debtId, requestId, CompleteRequestStatus.DENIED)
            }
        },
        async accept(debtId: number, requestId: number) {
            const result = await accept(requestId)
            if (result == 'success') {
                this.updateCompleteRequestStatus(debtId, requestId, CompleteRequestStatus.ACCEPTED)
            }
        },
        async load(debtId: number) {
            const result = await load(debtId)
            if (result.status === 'success') {
                this.debtIdCompleteRequestMap.set(debtId, result.data)
            }
        },
        unique(debtId: number) {
            if (this.debtIdCompleteRequestMap.has(debtId)) this.debtIdCompleteRequestMap.set(
                debtId, this.debtIdCompleteRequestMap.get(debtId)!.reduce((acc: CompleteRequest[], el: CompleteRequest) => {
                    if (acc.find(i => i.id == el.id)) {
                        return acc
                    } 
                    return [...acc, el]
                }, [] as CompleteRequest[])
            )
        }
    },
    getters: {
        acceptedCompleteRequests() {
            return (debtId: number) => this.debtIdCompleteRequestMap.get(debtId)?.filter(el => el.status == CompleteRequestStatus.ACCEPTED)
        }
    }
})