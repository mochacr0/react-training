import ContactAddressPanel from "./ContactAddressPanel";
import ContactEmailPanel from "./ContactEmailPanel";
import ContactPhonePanel from "./ContactPhonePanel";

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
