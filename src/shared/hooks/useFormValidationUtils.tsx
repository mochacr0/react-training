import { FormikProps } from "formik";

export function useFormValidationUtils<FormValues>(formik: FormikProps<FormValues>) {
    function isErrorField(fieldName: keyof FormValues) {
        return formik.touched[fieldName] && formik.errors[fieldName];
    }

    function getErrorFieldColor(fieldName: keyof FormValues) {
        return isErrorField(fieldName) ? "failure" : "blue";
    }

    function getErrorFieldMessage(fieldName: keyof FormValues) {
        return isErrorField(fieldName) ? formik.errors[fieldName] : "";
    }

    return { getErrorFieldColor, getErrorFieldMessage };
}
