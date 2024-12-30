import { RouteObject } from "react-router";
import KYCForm from "../components/kyc/KYCForm";
import PersonalInformationForm from "../components/profile/PersonalInformationForm";
import SubmitReview from "../components/review/SubmitReview";
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
                path: ":id/pi",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <PersonalInformation />
                    </RequiresAuth>
                ),
            },
            {
                path: ":id/pi/edit",
                element: (
                    <RequiresAuth allowedRoles={[UserRole.CLIENT, UserRole.OFFICER]}>
                        <PersonalInformationForm />
                    </RequiresAuth>
                ),
            },
            {
                path: ":id/kyc/edit",
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
                        <SubmitReview />
                    </RequiresAuth>
                ),
            },
        ],
    },
];

export default userRoutes;
