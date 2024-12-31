import { createContext, useContext, useMemo, useState } from "react";

type DisabledFormContextType = {
    isFormDisabled: boolean;
    updateIsFormDisabled: (isDisaled: boolean) => void;
};

const DisabledFormContext = createContext<DisabledFormContextType | null>(null);

export const DisabledFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

    const updateIsFormDisabled = (isDisabled: boolean) => {
        setIsFormDisabled(isDisabled);
    };

    const contextValue: DisabledFormContextType = useMemo(
        () => ({ isFormDisabled, updateIsFormDisabled }),
        [isFormDisabled],
    );

    return <DisabledFormContext.Provider value={contextValue}>{children}</DisabledFormContext.Provider>;
};

export const useDisabledForm = () => {
    const context = useContext(DisabledFormContext);
    if (!context) {
        throw new Error("useDisabledForm must be used within a DisabledFormProvider");
    }
    return context;
};
