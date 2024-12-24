import { ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../shared/CurrentUserProvider";
import { UserRole } from "../../models/user.model";
import { toast } from "react-toastify";

type RequiresAuthProps = {
    children: ReactElement;
    allowedRoles?: UserRole[];
};

const RequiresAuth = ({ allowedRoles, children }: RequiresAuthProps) => {
    const { currentUser } = useCurrentUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/auth/login", { state: { from: location.pathname } });
            return;
        }
        if (!allowedRoles || allowedRoles.length === 0) {
            return;
        }
        if (!allowedRoles.includes(currentUser.role)) {
            toast.error("You are not authorized to view this page");
            navigate(-1);
        }
    }, [currentUser, navigate, location, allowedRoles]);

    return children;
};

export default RequiresAuth;
