import { FormikProps } from "formik";

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

function extractFileName(url: string) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const fileName = pathname.substring(pathname.lastIndexOf("/") + 1);
    return fileName;
}

export async function urlToFile(url: string) {
    const fileName = extractFileName(url);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}
