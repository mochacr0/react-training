import { Button } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    IdentificationDocumentType,
    PersonalInforDetailsFormValues,
    toPersonalInfoDetailsFormValues,
    UpdatePersonalInfoDetailsRequest,
} from "../../models/profile.model";
import {
    useGetPersonalInfoDetailsQuery,
    useUpdatePersonalInfoDtailsMutation,
} from "../../redux/features/profile.api.slice";
import { useCurrentUserContext } from "../../shared/CurrentUserProvider";
import LoadingSpinner from "../Spinner";
import BasicInformationSection from "./BasicInformationSection";
import ContactInformationSection from "./contact/ContactInformationSection";
import IdentificationDocumentSection from "./IdentificationDocumentSection";
import OccupationSection from "./OccupationSection";
import { personalInformationSchema } from "./profile.schema";

const defaultInitialFormValues: PersonalInforDetailsFormValues = {
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
    const { currentUser } = useCurrentUserContext();
    const { data, isLoading } = useGetPersonalInfoDetailsQuery(currentUser?.id ?? "");
    const [initialFormValues, setInitialFormValues] =
        useState<PersonalInforDetailsFormValues>(defaultInitialFormValues);
    const [updatePersonalInfoDetails, updatePersonalInfoDetailsMutation] = useUpdatePersonalInfoDtailsMutation();

    const personalInfoDetails = data?.data;

    async function handleSubmit(
        values: PersonalInforDetailsFormValues,
        formikHelpers: FormikHelpers<PersonalInforDetailsFormValues>,
    ) {
        try {
            const updatePersonalInfoDetailsRequest: UpdatePersonalInfoDetailsRequest = {
                userId: currentUser?.id ?? "",
                personalInfoDetails: values,
            };
            const response = await updatePersonalInfoDetails(updatePersonalInfoDetailsRequest).unwrap();
            if (response.errors) {
                throw new Error(response.errors[0]);
            }
            formikHelpers.resetForm();
            toast.success("Personal information updated successfully");
        } catch (error) {
            let errorMessage = "Unknown error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error("Failed to update personal information: " + errorMessage);
        }
    }

    useEffect(() => {
        if (!personalInfoDetails) {
            return;
        }
        const formValues = toPersonalInfoDetailsFormValues(personalInfoDetails);
        setInitialFormValues(formValues);
    }, [personalInfoDetails]);

    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Personal Information</h2>
            {isLoading || !personalInfoDetails ? (
                <LoadingSpinner />
            ) : (
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={personalInformationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
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
                                        isProcessing={updatePersonalInfoDetailsMutation.isLoading}
                                        disabled={updatePersonalInfoDetailsMutation.isLoading || !formik.dirty}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </div>
    );
};

export default PersonalInformationForm;
