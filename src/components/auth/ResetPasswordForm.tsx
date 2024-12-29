import { Button, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormValidationUtils } from "../../shared/hooks/useFormValidationUtils";
import { useResetPasswordMutation } from "../../redux/features/auth.api.slice";
import { ResetPasswordRequest } from "../../models/auth.model";

type ResetPasswordFormProps = {
    email: string;
    password: string;
    confirmPassword: string;
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters")
        .max(16, "Password must be at most 16 characters")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#,&!]).{12,16}$/,
            "Password must contain at least one letter, one digit, and one special character (@, #, &, or !)",
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
    const [resetPassword, resetPasswordMutation] = useResetPasswordMutation();
    const { getErrorFieldColor, getErrorFieldMessage } = useFormValidationUtils(formik);

    async function handleSubmit(values: ResetPasswordFormProps) {
        const resetPasswordRequest: ResetPasswordRequest = {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };
        try {
            const resetPasswordResponse = await resetPassword(resetPasswordRequest).unwrap();
            if (resetPasswordResponse?.errors) {
                throw new Error(resetPasswordResponse.errors[0]);
            }

            toast.success("Password reset successfully");
            navigate("/auth/login");
        } catch (error: any) {
            let errorMessage = "Unknown error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error("Failed to login: " + errorMessage);
        }
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
                    disabled={resetPasswordMutation.isLoading}
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
                    disabled={resetPasswordMutation.isLoading}
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
                    disabled={resetPasswordMutation.isLoading}
                />
            </div>
            <Button
                size="lg"
                color="blue"
                type="submit"
                disabled={!formik.dirty || resetPasswordMutation.isLoading}
                isProcessing={resetPasswordMutation.isLoading}
            >
                Reset password
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
