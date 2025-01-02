import { Button, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ResetPasswordRequest } from "../../models/auth.model";
import { useResetPasswordMutation } from "../../redux/features/auth.api.slice";
import { getValidationProps } from "../../hooks/useFormValidationUtils";

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
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    disabled={resetPasswordMutation.isLoading}
                    {...formik.getFieldProps("email")}
                    {...getValidationProps("email", formik)}
                />
            </div>
            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    New password
                </label>
                <TextInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={resetPasswordMutation.isLoading}
                    {...formik.getFieldProps("password")}
                    {...getValidationProps("password", formik)}
                />
            </div>
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm New Password
                </label>
                <TextInput
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    required
                    disabled={resetPasswordMutation.isLoading}
                    {...formik.getFieldProps("confirmPassword")}
                    {...getValidationProps("confirmPassword", formik)}
                />
            </div>
            <Button
                size="lg"
                color="blue"
                type="submit"
                disabled={resetPasswordMutation.isLoading}
                isProcessing={resetPasswordMutation.isLoading}
            >
                Reset password
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
