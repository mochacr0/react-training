import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { getFieldPaths } from "../../utils/form.utils";
import { isEmptyObject } from "../../utils/object.utils";

const ErrorFocuser = () => {
    const { errors, touched, submitCount } = useFormikContext();
    const [currentSubmitCount, setCurrentSubmitCount] = useState(submitCount);

    useEffect(() => {
        if (isEmptyObject(errors) || submitCount === 0 || submitCount === currentSubmitCount) {
            return;
        }

        const errorPaths = getFieldPaths(errors);
        const touchedPaths = getFieldPaths(touched);

        const firstErrorPath = errorPaths.find((path) => touchedPaths.includes(path));

        if (firstErrorPath) {
            const firstErrorElement = document.querySelector(`[name="${CSS.escape(firstErrorPath)}"]`) as HTMLElement;
            if (firstErrorElement) {
                firstErrorElement.focus();
            }
        }

        setCurrentSubmitCount(submitCount);
    }, [errors, touched, submitCount, currentSubmitCount]);

    return null;
};

export default ErrorFocuser;
