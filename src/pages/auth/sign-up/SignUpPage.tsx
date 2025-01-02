import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
    return (
        <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-gray-900">
            <Link
                to="#"
                className="mb-8 flex items-center justify-center text-2xl font-semibold dark:text-white lg:mb-10"
            >
                <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
                <span>Sign-up for Simple KYC</span>
            </Link>
            <div className="mb-8 w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create a Free Account</h2>
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;
