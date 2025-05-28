export interface FullUser {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    role: Role;
    ownedDebts: Debt[];
    debts: Debt[];
    balance: number;
}