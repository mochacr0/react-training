import dayjs from "dayjs";
import * as Yup from "yup";

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

export default personalInformationSchema;
