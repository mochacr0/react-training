import { RouteObject } from "react-router";
import KYCForm from "../components/kyc/KYCForm";
import PersonalInformationForm from "../components/profile/PersonalInformationForm";
import Submissions from "../components/submission/Submissions";
import PersonalInformation from "../pages/user/personal-information/PersonalInformation";
import User from "../pages/user/user";
import RequiresAuth from "../components/auth/RequiresAuth";
import { UserRole } from "../models/user.model";

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
                        <PersonalInformationForm />
                    </RequiresAuth>
                ),
            },
            {
                path: ":clientId/kyc/edit",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <KYCForm />
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
