import { FormikProps } from "formik";
import { HasAmount } from "../models/kyc.model";

export function isEmptyObject(obj: any): boolean {
    return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}

export function shouldDisableButton<FormValues>(formik: FormikProps<FormValues>, isSubmitting: boolean): boolean {
    // const areFieldsNotTouched = isEmptyObject(formik.touched);
    const hasErrors = !isEmptyObject(formik.errors);
    return hasErrors || isSubmitting;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getTotalAmount(values: HasAmount[]) {
    return values.reduce((totalAmount: number, value: HasAmount) => {
        return totalAmount + value.amount;
    }, 0);
}
