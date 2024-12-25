import { FormikProps } from "formik";

export function isEmptyObject(obj: any): boolean {
    return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}

export function shouldDisableButton<FormValues>(formik: FormikProps<FormValues>, isSubmitting: boolean): boolean {
    // const areFieldsNotTouched = isEmptyObject(formik.touched);
    const hasErrors = !isEmptyObject(formik.errors);
    return hasErrors || isSubmitting;
}
