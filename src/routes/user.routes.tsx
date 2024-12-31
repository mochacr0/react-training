import { RouteObject } from "react-router";
import RequiresAuth from "../components/common/RequiresAuth";
import Submissions from "../components/submission/Submissions";
import { UserRole } from "../models/user.model";
import EditKYC from "../pages/kyc/EditKYC";
import PersonalInformation from "../pages/personal-information/PersonalInformation";
import EditPersonalInformation from "../pages/personal-information/EditPersonalInformation";

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
