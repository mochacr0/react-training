import { RouteObject } from "react-router";
import KYCPage from "../components/kyc/KYCPage";
import PersonalInformationForm from "../components/profile/PersonalInformationForm";
import SubmitReview from "../components/review/SubmitReview";
import PersonalInformation from "../pages/user/personal-information/PersonalInformation";
import User from "../pages/user/user";

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
                path: ":id/kyc/edit",
                element: <KYCPage />,
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
