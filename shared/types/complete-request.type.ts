import type { CompleteRequestStatus } from "./complete-request-status.type"

export interface CompleteRequest {
    title: string
    description?: string
    price: number
    status: CompleteRequestStatus
    debt: Debt
}