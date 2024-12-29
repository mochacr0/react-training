import { RouteObject } from "react-router";
import LoggedInUserRouter from "../components/auth/LoggedInUserRouter";
import RequiresAuth from "../components/auth/RequiresAuth";
import LoginPage from "../pages/auth/login/LoginPage";
import LogoutPage from "../pages/auth/logout/LogoutPage";
import ResetPasswordPage from "../pages/auth/reset-password/ResetPasswordPage";
import SignUpPage from "../pages/auth/sign-up/SignUpPage";

const authRoutes: RouteObject[] = [
    {
        path: "auth",
        children: [
            {
                path: "login",
                element: (
                    <LoggedInUserRouter>
                        <LoginPage />
                    </LoggedInUserRouter>
                ),
            },
            {
                path: "sign-up",
                element: (
                    <LoggedInUserRouter>
                        <SignUpPage />
                    </LoggedInUserRouter>
                ),
            },
            {
                path: "reset-password",
                element: <ResetPasswordPage />,
            },
            {
                path: "logout",
                element: (
                    <RequiresAuth>
                        <LogoutPage />
                    </RequiresAuth>
                ),
            },
        ],
    },
];

export default authRoutes;
