import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../shared/providers/CurrentUserProvider";

const LoggedInUserRouter = ({ children }: { children: ReactElement }) => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUserContext();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [navigate, currentUser]);

    return children;
};

export default LoggedInUserRouter;
