import { Button, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormValidationUtils } from "../../shared/hooks/useFormValidationUtils";

type ResetPasswordFormProps = {
    email: string;
    password: string;
    confirmPassword: string;
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character",
        ),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Confirm password is not matched"),
});

const initialFormValues: ResetPasswordFormProps = {
    email: "",
    password: "",
    confirmPassword: "",
};

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const formik = useFormik<ResetPasswordFormProps>({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });
    const { getErrorFieldColor, getErrorFieldMessage } = useFormValidationUtils(formik);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(values: ResetPasswordFormProps) {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Password reset successfully");
            navigate("/auth/login");
        }, 3000);
    }

    return (
        <form className="mt-8 space-y-6" noValidate onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <TextInput
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                    color={getErrorFieldColor("email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={getErrorFieldMessage("email")}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    New password
                </label>
                <TextInput
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    color={getErrorFieldColor("password")}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    helperText={getErrorFieldMessage("password")}
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm New Password
                </label>
                <TextInput
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    color={getErrorFieldColor("confirmPassword")}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    helperText={getErrorFieldMessage("confirmPassword")}
                    disabled={isSubmitting}
                />
            </div>
            <Button
                size="lg"
                color="blue"
                type="submit"
                disabled={!formik.dirty || isSubmitting}
                isProcessing={isSubmitting}
            >
                Reset password
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
