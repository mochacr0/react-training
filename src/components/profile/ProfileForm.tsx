import { Button } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { shouldDisableButton } from "../../shared/utils";
import BasicInformationSection from "./BasicInformationSection";
import ContactInformationSection from "./ContactInformationSection";
import IdentificationDocumentSections from "./IdentificationDocumentSection";
import OccupationSection from "./OccupationSection";
import dayjs from "dayjs";

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
            type: "passport",
            expiryDate: "",
            file: null,
        },
    ],
    occupations: [],
};

const basicInformationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
});

const contactAddressSchema = Yup.object().shape({
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    postalCode: Yup.string(),
    type: Yup.string().required("Type is required"),
});

const contactEmailSchema = Yup.object().shape({
    address: Yup.string().email("Email address is invalid").required("Email address is required"),
    type: Yup.string().required("Type is required"),
    isPreferred: Yup.string().required("Preferred is required"),
});

const contactPhoneSchema = Yup.object().shape({
    number: Yup.string().required("Phone number is required"),
    type: Yup.string().required("Type is required"),
    isPreferred: Yup.string().required("Preferred is required"),
});

const contactInformationSchema = Yup.object().shape({
    addresses: Yup.array().of(contactAddressSchema),
    emails: Yup.array().of(contactEmailSchema),
    phones: Yup.array().of(contactPhoneSchema),
});

const identificationDocumentsSchema = Yup.array()
    .of(
        Yup.object().shape({
            type: Yup.string().required("Type is required"),
            expiryDate: Yup.string().required("Expiry date is required"),
            file: Yup.mixed().required("File is required"),
        }),
    )
    .min(1, "At least one identification document is required");

const occupationSchema = Yup.array().of(
    Yup.object().shape({
        title: Yup.string().required("Occupation is required"),
        fromDate: Yup.string().required("From date is required"),
        toDate: Yup.string().test(
            "fromDateIsBeforeToDate",
            "To date must be greater than from date",
            function (value, context) {
                if (value && context.parent.fromDate) {
                    const fromDate = dayjs(context.parent.fromDate);
                    const toDate = dayjs(value);
                    if (toDate.isBefore(fromDate)) {
                        return false;
                    }
                }
                return true;
            },
        ),
    }),
);

const personalInformationSchema = Yup.object().shape({
    contactInformation: contactInformationSchema,
    basicInformation: basicInformationSchema,
    identificationDocuments: identificationDocumentsSchema,
    occupations: occupationSchema,
});

const ProfileForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(
        values: PersonalInformationFormValues,
        formikHelpers: FormikHelpers<PersonalInformationFormValues>,
    ) {
        setIsSubmitting(true);
        setTimeout(() => {
            try {
                console.log(values);
                toast.success("Profile updated successfully");
            } finally {
                // formikHelpers.resetForm();
                setIsSubmitting(false);
            }
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
                            <BasicInformationSection formik={formik} />
                            <ContactInformationSection formik={formik} />
                            <IdentificationDocumentSections formik={formik} />
                            <OccupationSection formik={formik} />
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
            <form className="mt-6 space-y-6" noValidate>
                {/* 

                <div className="panel mb-6">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Occupations</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium">
                                Occupation
                            </label>
                            <select
                                id="occupation"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            >
                                <option value="unemployed">Unemployed</option>
                                <option value="engineer">Engineer</option>
                                <option value="teacher">Teacher</option>
                                <option value="doctor">Doctor</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="occupation-from" className="block text-sm font-medium">
                                From Date
                            </label>
                            <input
                                type="date"
                                id="occupation-from"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="occupation-to" className="block text-sm font-medium">
                                To Date
                            </label>
                            <input
                                type="date"
                                id="occupation-to"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            />
                        </div>
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Occupation
                    </button>
                </div> */}

                {/* <div className="text-right">
                    <button type="submit" className="btn-primary rounded-md px-6 py-3">
                        Submit
                    </button>
                </div> */}
            </form>
        </div>
    );
};

export default ProfileForm;
