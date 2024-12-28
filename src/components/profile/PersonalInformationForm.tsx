import { Button } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { IdentificationDocumentType, PersonalInformationFormValues } from "../../models/profile.model";
import { shouldDisableButton } from "../../shared/utils";
import BasicInformationSection from "./BasicInformationSection";
import ContactInformationSection from "./contact/ContactInformationSection";
import IdentificationDocumentSection from "./IdentificationDocumentSection";
import OccupationSection from "./OccupationSection";
import { personalInformationSchema } from "./profile.schema";

const initialFormValues: PersonalInformationFormValues = {
    contactInformation: {
        addresses: [],
        emails: [],
        phones: [],
    },
    basicInformation: {
        firstName: "",
        lastName: "",
        middleName: "",
        dateOfBirth: "",
        age: "",
    },
    identificationDocuments: [
        {
            type: IdentificationDocumentType.PASSPORT,
            expiryDate: "",
            file: null,
        },
    ],
    occupations: [],
};

const PersonalInformationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(
        values: PersonalInformationFormValues,
        formikHelpers: FormikHelpers<PersonalInformationFormValues>,
    ) {
        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("Profile updated successfully");
            formikHelpers.resetForm();
            setIsSubmitting(false);
        }, 1500);
    }

    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Personal Information</h2>
            <Formik
                initialValues={initialFormValues}
                validationSchema={personalInformationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form noValidate className="mt-6 space-y-6">
                            <BasicInformationSection />
                            <ContactInformationSection />
                            <IdentificationDocumentSection />
                            <OccupationSection />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="btn-primary rounded-md px-4 py-2"
                                    isProcessing={isSubmitting}
                                    disabled={shouldDisableButton(formik, isSubmitting)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default PersonalInformationForm;
