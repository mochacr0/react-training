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

export function handleAmountKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab", "Enter"];
    const digitKeyPattern = /^\d$/;

    if (!allowedKeys.includes(event.key) && !digitKeyPattern.test(event.key)) {
        event.preventDefault();
    }
}
