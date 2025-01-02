import { HasAmount } from "../models/kyc.model";

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

export function getFieldPaths(errors: object, currentPath: string = ""): string[] {
    if (errors === null || typeof errors !== "object") {
        return [currentPath];
    }

    return Object.entries(errors)
        .flatMap(([key, value]) => {
            const newPath = currentPath ? `${currentPath}.${key}` : key;
            return getFieldPaths(value, newPath);
        })
        .filter(Boolean);
}
