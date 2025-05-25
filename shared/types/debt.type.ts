import type { Currency } from "./currency.type";
import type { DebtStatus } from "./debt-status.type";

export interface Debt {
    id: number;
    title: string;
    description?: string;
    status: DebtStatus;
    isCompleted: boolean;
    price: number;
    complete: number;
    currency: Currency;
    lender: FullUser
}