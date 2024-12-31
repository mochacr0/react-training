import { HasAmount } from "../models/kyc.model";

export function isEmptyObject(obj: any): boolean {
    return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getTotalAmount(values: HasAmount[]) {
    return values.reduce((totalAmount: number, value: HasAmount) => {
        return totalAmount + value.amount;
    }, 0);
}
