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
            {
                path: ":id/pi",
                element: (
                    // <RequiresAuth allowedRoles={[UserRole.CLIENT]}>
                    <PersonalInformation />
                    // </RequiresAuth>
                ),
            },
            {
                path: ":id/kyc",
                element: <UserKYC />,
            },
            {
                path: "profile",
                element: <PersonalInformationForm />,
            },
            {
                path: "kyc",
                element: <KYCForm />,
            },
            {
                path: "submit-review",
                element: <SubmitReview />,
            },
            {
                path: "profiles",
                element: <SubmitReview />,
            },
        ],
    },
];

export default userRoutes;
