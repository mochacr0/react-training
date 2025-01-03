import { Spinner } from "flowbite-react";

const LoadingSpinner = () => {
    return (
        <div className="flex h-full w-full items-center justify-center p-3">
            <Spinner className="h-12 w-12" />
        </div>
    );
};

export default LoadingSpinner;
