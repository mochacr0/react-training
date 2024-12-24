import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { User, UserRole } from "../models/user.model";

type CurrentUserContextType = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState<User | null>({
    //     name: "Neo Amstrong",
    //     email: "neoamstrong@gmail.com",
    //     role: UserRole.CLIENT,
    //     password: "String@",
    // });
    const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUserFromStorage());

    const contextValue = useMemo(() => ({ currentUser, setCurrentUser: updateCurrentUser }), [currentUser]);

    function updateCurrentUser(user: User | null) {
        setCurrentUser(user);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("currentUser");
        }
    }

    return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};

export const useCurrentUserContext = (): CurrentUserContextType => {
    const context = useContext(CurrentUserContext);
    if (context === null) {
        throw new Error("userCurrentUser must be used within a UserProvider");
    }
    return context;
};

function getCurrentUserFromStorage(): User | null {
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
        return null;
    }
    return JSON.parse(userString);
}
