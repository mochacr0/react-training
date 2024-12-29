import { Button, Checkbox, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormValidationUtils } from "../../shared/hooks/useFormValidationUtils";
import { findUserByEmail } from "../../shared/data/users";
import { useCurrentUserContext } from "../../shared/CurrentUserProvider";
import { shouldDisableButton } from "../../shared/utils";
import { UserRole } from "../../models/user.model";
import { useLoginMutation } from "../../redux/features/auth.api.slice";
import { LoginRequest } from "../../models/auth.model";

type LoginFormValues = {
    email: string;
    password: string;
};

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters")
        .max(16, "Password must be at most 16 characters")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#,&!]).{12,16}$/,
            "Password must contain at least one letter, one digit, and one special character (@, #, &, or !)",
        ),
});

const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
};

const LoginForm = () => {
    const navigate = useNavigate();
    const formik = useFormik<LoginFormValues>({
        initialValues: initialFormValues,
        validationSchema,
        onSubmit: handleSubmit,
    });
    const [login, loginMutation] = useLoginMutation();
    const { getErrorFieldColor, getErrorFieldMessage } = useFormValidationUtils(formik);
    const { setCurrentUser } = useCurrentUserContext();

    async function handleSubmit(values: LoginFormValues) {
        try {
            const loginRequest: LoginRequest = {
                email: values.email,
                password: values.password,
            };
            const loginResponse = await login(loginRequest).unwrap();
            if (loginResponse?.errors) {
                throw new Error(loginResponse.errors[0]);
            }

            if (!loginResponse.data) {
                throw new Error("User is empty");
            }

            setCurrentUser(loginResponse.data);
            formik.resetForm();
            toast.success("Login successfully");
            if (loginResponse.data.role === UserRole.CLIENT) {
                navigate(`/user/${loginResponse.data.id}/pi`);
            } else {
                navigate("/user/submit-review");
            }
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
                    onBlur={formik.handleBlur}
                    helperText={getErrorFieldMessage("email")}
                    disabled={loginMutation.isLoading}
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
                    minLength={12}
                    maxLength={16}
                    color={getErrorFieldColor("password")}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={getErrorFieldMessage("password")}
                    disabled={loginMutation.isLoading}
                />
            </div>
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <Checkbox
                        aria-describedby="remember"
                        name="remember"
                        required
                        color="blue"
                        disabled={loginMutation.isLoading}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">
                        Remember me
                    </label>
                </div>
                <Link
                    to="/auth/reset-password"
                    className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
                >
                    Lost Password?
                </Link>
            </div>
            <Button
                size="lg"
                color="blue"
                type="submit"
                disabled={shouldDisableButton(formik, loginMutation.isLoading)}
                isProcessing={loginMutation.isLoading}
            >
                Login to my account
            </Button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Forgot password?{" "}
                <Link to="/auth/sign-up" className="text-primary-700 hover:underline dark:text-primary-500">
                    Sign-up
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
