import HomeComponent from "../pages/home/HomeComponent";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import DefaultLayout from "../components/layout/DefaultLayout";

const pageRoutes = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "home",
                element: <HomeComponent />,
            },
            ...authRoutes,
            ...userRoutes,
        ],
    },
];

export default pageRoutes;
