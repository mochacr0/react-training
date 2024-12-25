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

type LoginFormValues = {
    email: string;
    password: string;
};

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string().required("Password is required"),
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
    const { getErrorFieldColor, getErrorFieldMessage } = useFormValidationUtils(formik);
    const { setCurrentUser } = useCurrentUserContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(values: LoginFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            try {
                const matchedUser = findUserByEmail(values.email);
                if (!matchedUser || matchedUser.password !== values.password) {
                    toast.error("Invalid email or password");
                    return;
                }
                setCurrentUser(matchedUser);
                formik.resetForm();
                toast.success("Login successfully");
                navigate("/");
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
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
                    onBlur={formik.handleBlur}
                    helperText={getErrorFieldMessage("password")}
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <Checkbox
                        aria-describedby="remember"
                        name="remember"
                        required
                        color="blue"
                        disabled={isSubmitting}
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
                disabled={shouldDisableButton(formik, isSubmitting)}
                isProcessing={isSubmitting}
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
