import { Button, Checkbox, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormValidationUtils } from "../../../shared/hooks/useFormValidationUtils";

type SignupFormValues = {
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

const initialFormValues: SignupFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const formik = useFormik<SignupFormValues>({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });
    const { getErrorFieldColor, getErrorFieldMessage } = useFormValidationUtils(formik);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(values: SignupFormValues) {
        if (!acceptTerms) {
            toast.info("Please accept the terms and conditions");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Account created successfully");
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
                    Your password
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
                    Confirm password
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
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <Checkbox
                        color="blue"
                        name="agreeTerms"
                        checked={acceptTerms}
                        onChange={() => {
                            setAcceptTerms(!acceptTerms);
                        }}
                        disabled={isSubmitting}
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
                disabled={!formik.dirty || isSubmitting}
                isProcessing={isSubmitting}
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
