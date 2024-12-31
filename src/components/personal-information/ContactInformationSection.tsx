import ContactAddressPanel from "./contact/ContactAddressPanel";
import ContactEmailPanel from "./contact/ContactEmailPanel";
import ContactPhonePanel from "./contact/ContactPhonePanel";

const ContactInformationSection = () => {
    return (
        <div className="panel rounded-md border p-4">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Contact Information</h3>
            <div className="space-y-4">
                <ContactAddressPanel />
                <ContactEmailPanel />
                <ContactPhonePanel />
            </div>
        </div>
    );
};

export default ContactInformationSection;
