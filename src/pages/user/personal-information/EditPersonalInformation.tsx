import PersonalInformationForm from "../../../components/profile/PersonalInformationForm";
import { DisabledFormProvider } from "../../../shared/providers/DisabledFormProvider";

const EditPersonalInformation = () => {
    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Personal Information</h2>
            <DisabledFormProvider>
                <PersonalInformationForm />
            </DisabledFormProvider>
        </div>
    );
};

export default EditPersonalInformation;
