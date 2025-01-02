import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

type SuspenseWrapperProps = {
    children: React.ReactNode;
};

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
    return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

export default SuspenseWrapper;
