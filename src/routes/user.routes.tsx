import { RouteObject } from "react-router";
import UserKYC from "../pages/user/kyc/kyc";
import PersonalInformation from "../pages/user/personal-information/PersonalInformation";
import User from "../pages/user/user";
import PersonalInformationForm from "../components/profile/PersonalInformationForm";
import KYCForm from "../components/kyc/KYCForm";
import SubmitReview from "../components/review/SubmitReview";

const userRoutes: RouteObject[] = [
    {
        path: "user",
        element: <User />,
        children: [
            // User Routes
            {
                path: ":id/pi",
                element: (
                    // <RequiresAuth allowedRoles={[UserRole.CLIENT]}>
                    <PersonalInformation />
                    // </RequiresAuth>
                ),
            },
            {
                path: ":id/pi/edit",
                element: <PersonalInformationForm />,
            },
            {
                path: ":id/kyc",
                element: <UserKYC />,
            },
            {
                path: ":id/kyc/edit",
                element: <KYCForm />,
            },

            // Officer Routes
            {
                path: "submit-review",
                element: <SubmitReview />,
            },
        ],
    },
];

export default userRoutes;
