import { Outlet } from "react-router";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import CustomizedToastContainer from "../common/CustomizedToastContainer";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DefaultLayout = () => {
    const { currentUser } = useCurrentUserContext();

    return (
        <>
            <Header />

            {currentUser ? (
                <div className="flex overflow-hidden bg-gray-50 pt-16 dark:bg-gray-900">
                    <Sidebar />
                    <div
                        id="main-content"
                        className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64"
                    >
                        <main>
                            <Outlet></Outlet>
                            <Footer />
                        </main>
                    </div>
                </div>
            ) : (
                <div className="pt-14">
                    <Outlet></Outlet>
                </div>
            )}
            <CustomizedToastContainer />
        </>
    );
};

export default DefaultLayout;
