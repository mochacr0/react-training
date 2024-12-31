import { RouteObject } from "react-router";
import RequiresAuth from "../components/auth/RequiresAuth";
import Submissions from "../components/submission/Submissions";
import { UserRole } from "../models/user.model";
import EditKYC from "../pages/user/kyc/EditKYC";
import EditPersonalInformation from "../pages/user/personal-information/EditPersonalInformation";
import PersonalInformation from "../pages/user/personal-information/PersonalInformation";
import User from "../pages/user/user";

const userRoutes: RouteObject[] = [
    {
        path: "user",
        element: <User />,
        children: [
            // User Routes
            {
                path: ":clientId/pi",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <PersonalInformation />
                    </RequiresAuth>
                ),
            },
            {
                path: ":clientId/pi/edit",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <EditPersonalInformation />
                    </RequiresAuth>
                ),
            },
            {
                path: ":clientId/kyc/edit",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <EditKYC />
                    </RequiresAuth>
                ),
            },

            // Officer Routes
            {
                path: "submit-review",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.OFFICER]}>
                        <Submissions />
                    </RequiresAuth>
                ),
            },
        ],
    },
];

export default userRoutes;
