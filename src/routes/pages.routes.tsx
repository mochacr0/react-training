import HomeComponent from "../pages/home/HomeComponent";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import DefaultLayout from "../components/layout/DefaultLayout";
import { RouteObject } from "react-router";
import RequiresAuth from "../components/common/RequiresAuth";
import { UserRole } from "../models/user.model";

const pageRoutes: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <HomeComponent />
                    </RequiresAuth>
                ),
                index: true,
            },
            ...authRoutes,
            ...userRoutes,
        ],
    },
];

export default pageRoutes;
