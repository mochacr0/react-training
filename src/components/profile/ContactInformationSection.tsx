import { FormikProps } from "formik";
import { PersonalInformationFormValues } from "../../models/profile.model";
import ContactAddressPanel from "./ContactAddressPanel";
import ContactEmailPanel from "./ContactEmailPanel";
import ContactPhonePanel from "./ContactPhonePanel";

type ContactInformationSectionProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const ContactInformationSection = ({ formik }: ContactInformationSectionProps) => {
    return (
        <div className="panel rounded-md border p-4">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Contact Information</h3>
            <ContactAddressPanel formik={formik} />
            <ContactEmailPanel formik={formik} />
            <ContactPhonePanel formik={formik} />
        </div>
    );
};

export default ContactInformationSection;
