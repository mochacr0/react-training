import { Button } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
    IdentificationDocumentType,
    PersonalInforDetailsFormValues,
    toPersonalInfoDetailsFormValues,
    UpdatePersonalInfoDetailsRequest,
} from "../../models/personal.information.model";
import { UserRole } from "../../models/user.model";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { useDisabledForm } from "../../providers/DisabledFormProvider";
import {
    useGetPersonalInfoDetailsQuery,
    useUpdatePersonalInfoDtailsMutation,
} from "../../redux/features/personal.information.api.slice";
import LoadingSpinner from "../common/LoadingSpinner";
import BasicInformationSection from "./BasicInformationSection";
import ContactInformationSection from "./ContactInformationSection";
import IdentificationDocumentSection from "./IdentificationDocumentSection";
import { personalInformationSchema } from "./personal.information.schema";
import OccupationSection from "./OccupationSection";
import ErrorFocuser from "../common/ErrorFocuser";

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
    const { clientId } = useParams();
    const { data, isLoading } = useGetPersonalInfoDetailsQuery(clientId ?? "");
    const [initialFormValues, setInitialFormValues] =
        useState<PersonalInforDetailsFormValues>(defaultInitialFormValues);
    const [updatePersonalInfoDetails, updatePersonalInfoDetailsMutation] = useUpdatePersonalInfoDtailsMutation();
    const { currentUser } = useCurrentUserContext();
    const { isFormDisabled, updateIsFormDisabled } = useDisabledForm();

    useEffect(() => {
        if (currentUser?.role === UserRole.OFFICER) {
            updateIsFormDisabled(true);
        }
    }, [currentUser, updateIsFormDisabled]);

    useEffect(() => {
        const personalInfoDetailsDTO = data?.data;
        if (!personalInfoDetailsDTO) {
            return;
        }

        const formValues = toPersonalInfoDetailsFormValues(personalInfoDetailsDTO);
        setInitialFormValues(formValues);
    }, [data]);

    async function handleSubmit(
        values: PersonalInforDetailsFormValues,
        formikHelpers: FormikHelpers<PersonalInforDetailsFormValues>,
    ) {
        try {
            const updatePersonalInfoDetailsRequest: UpdatePersonalInfoDetailsRequest = {
                clientId: clientId ?? "",
                body: values,
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

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={personalInformationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {(formik) => {
                return (
                    <Form noValidate>
                        <fieldset className="mt-6 space-y-6" disabled={isFormDisabled}>
                            <ErrorFocuser />
                            <BasicInformationSection />
                            <ContactInformationSection />
                            <IdentificationDocumentSection />
                            <OccupationSection />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="btn-primary rounded-md px-4 py-2"
                                    isProcessing={updatePersonalInfoDetailsMutation.isLoading}
                                    disabled={
                                        updatePersonalInfoDetailsMutation.isLoading || !formik.dirty || isFormDisabled
                                    }
                                >
                                    Submit
                                </Button>
                            </div>
                        </fieldset>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PersonalInformationForm;
