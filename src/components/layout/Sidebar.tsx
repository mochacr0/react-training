import { Link } from "react-router-dom";
import { UserRole } from "../../models/user.model";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { TiDocumentText } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";

interface MenuItem {
    name: string;
    url: string;
    icon: React.ReactElement;
    roles: UserRole[];
}

const menuItems: MenuItem[] = [
    {
        name: "My Profile",
        url: "/user/1/pi",
        icon: <FaRegUser />,
        roles: [UserRole.CLIENT],
    },
    {
        name: "My Submissions",
        url: "/user/1/submissions",
        icon: <TiDocumentText />,
        roles: [UserRole.CLIENT],
    },
    {
        name: "Submit Review",
        url: "/user/submit-review",
        icon: <TiDocumentText />,
        roles: [UserRole.OFFICER],
    },
];

const Sidebar = () => {
    const { currentUser } = useCurrentUserContext();

    return (
        <aside
            id="sidebar"
            className="fixed left-0 top-0 z-20 hidden h-full w-64 flex-shrink-0 flex-col pt-16 font-normal transition-width duration-75 lg:flex"
            aria-label="Sidebar"
        >
            <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                    <div className="flex-1 space-y-1 divide-y divide-gray-200 bg-white px-3 dark:divide-gray-700 dark:bg-gray-800">
                        <ul className="space-y-2 pb-2">
                            {menuItems.map((item: any) => {
                                if (!item.roles.includes(currentUser?.role)) {
                                    return null;
                                }
                                return (
                                    <li key={item.url}>
                                        <Link
                                            to={item.url}
                                            className="group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                        >
                                            {item.icon}
                                            <span className="ml-3" sidebar-toggle-item="">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
