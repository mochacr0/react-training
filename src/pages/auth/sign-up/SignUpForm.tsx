import { Button, Checkbox, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SignUpRequest } from "../../../models/auth.model";
import { useSignUpMutation } from "../../../redux/features/auth.api.slice";
import { getValidationProps } from "../../../hooks/useFormValidationUtils";

type SignupFormValues = {
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

const initialFormValues: SignupFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const [signUp, signUpMutation] = useSignUpMutation();
    const formik = useFormik<SignupFormValues>({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });
    const [acceptTerms, setAcceptTerms] = useState(false);

    async function handleSubmit(values: SignupFormValues) {
        if (!acceptTerms) {
            toast.info("Please accept the terms and conditions");
            return;
        }
        try {
            const signUpRequest: SignUpRequest = {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            };
            const signUpResponse = await signUp(signUpRequest).unwrap();
            if (signUpResponse.errors) {
                throw new Error(signUpResponse.errors[0]);
            }

            toast.success(signUpResponse.message);
            formik.resetForm();
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
                    disabled={signUpMutation.isLoading}
                    {...formik.getFieldProps("email")}
                    {...getValidationProps("email", formik)}
                />
            </div>
            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                </label>
                <TextInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={signUpMutation.isLoading}
                    {...formik.getFieldProps("password")}
                    {...getValidationProps("password", formik)}
                />
            </div>
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm password
                </label>
                <TextInput
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={signUpMutation.isLoading}
                    {...formik.getFieldProps("confirmPassword")}
                    {...getValidationProps("confirmPassword", formik)}
                />
            </div>
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <Checkbox
                        color="blue"
                        name="agreeTerms"
                        checked={acceptTerms}
                        onChange={() => {
                            setAcceptTerms(!acceptTerms);
                        }}
                        disabled={signUpMutation.isLoading}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">
                        I accept the{" "}
                        <Link to="#" className="text-primary-700 hover:underline dark:text-primary-500">
                            Terms and Conditions
                        </Link>
                    </label>
                </div>
            </div>
            <Button
                size="lg"
                color="blue"
                type="submit"
                disabled={signUpMutation.isLoading}
                isProcessing={signUpMutation.isLoading}
            >
                Create account
            </Button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary-700 hover:underline dark:text-primary-500">
                    Login here
                </Link>
            </div>
        </form>
    );
};

export default SignUpForm;
