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

export function getValidationProps<FormValues>(fieldPath: string, formik: FormikProps<FormValues>) {
    const getNestedValue = (obj: any, fieldPath: string) => {
        return fieldPath
            .split(".")
            .reduce((currentObjectAccessor, currentPathSegment) => currentObjectAccessor?.[currentPathSegment], obj);
    };

    const error = getNestedValue(formik.errors, fieldPath);
    const isTouched = getNestedValue(formik.touched, fieldPath);

    return {
        color: error && isTouched ? "failure" : "blue",
        helperText: error && isTouched ? error : undefined,
    };
}
