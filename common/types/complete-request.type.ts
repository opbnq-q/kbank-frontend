export interface CompleteRequest {
    id: number
    title: string
    description?: string
    price: number
    status: CompleteRequestStatus
    debt: Debt
}