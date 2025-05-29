import type { CompleteRequest } from "./complete-request.type";

export interface Debt {
    id: number;
    title: string;
    description?: string;
    status: DebtStatus;
    isCompleted: boolean;
    price: number;
    complete: number;
    currency: Currency;
    lender: FullUser;
    completeRequests: CompleteRequest[];
}