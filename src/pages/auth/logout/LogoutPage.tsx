import { useEffect } from "react";
import { useCurrentUserContext } from "../../../providers/CurrentUserProvider";
import { useNavigate } from "react-router";

const LogoutPage = () => {
    const { setCurrentUser } = useCurrentUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(null);
        navigate("/auth/login");
    });

    return <></>;
};

export default LogoutPage;
