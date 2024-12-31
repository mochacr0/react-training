import KYCForm from "../../../components/kyc/KYCForm";
import { DisabledFormProvider } from "../../../shared/providers/DisabledFormProvider";

const EditKYC = () => {
    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-bold text-primary-900">Financial Status</h2>
            <DisabledFormProvider>
                <KYCForm />
            </DisabledFormProvider>
        </div>
    );
};

export default EditKYC;
