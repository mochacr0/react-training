import { RouteObject } from "react-router";
import RequiresAuth from "../components/common/RequiresAuth";
import UserSubmissionsPage from "../pages/submissions/UserSubmissionsPage";
import { UserRole } from "../models/user.model";
import EditKYC from "../pages/kyc/EditKYC";
import EditPersonalInformation from "../pages/personal-information/EditPersonalInformation";
import PersonalInformation from "../pages/personal-information/PersonalInformation";
import MySubmissionsPage from "../pages/submissions/MySubmissions";

const userRoutes: RouteObject[] = [
    {
        path: "user",
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
            {
                path: ":clientId/submissions",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <MySubmissionsPage />
                    </RequiresAuth>
                ),
            },

            // Officer Routes
            {
                path: "submit-review",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.OFFICER]}>
                        <UserSubmissionsPage />
                    </RequiresAuth>
                ),
            },
        ],
    },
];

export default userRoutes;
