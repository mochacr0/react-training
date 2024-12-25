import { FieldArray, FormikProps } from "formik";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { Select, TextInput } from "flowbite-react";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";

type ContactEmailPanelProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const ContactEmailPanel = ({ formik }: ContactEmailPanelProps) => {
    return (
        <div className="panel mb-6">
            <h4 className="text-md mb-4 font-semibold">Emails</h4>
            <FieldArray
                name="contactInformation.emails"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.emails.map((email, index) => {
                                return (
                                    <fieldset
                                        key={index + 1}
                                        className="relative mb-6 rounded-lg border border-gray-200 p-6 shadow-md"
                                    >
                                        <legend className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1 text-sm font-medium">
                                            {`Phone #${index + 1}`}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    arrayHelpers.remove(index);
                                                }}
                                                className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M18 6L6 18M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </legend>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.emails.${index}.address`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Email Address
                                                </label>
                                                <TextInput
                                                    type="email"
                                                    className="mt-2"
                                                    id={`contactInformation.emails.${index}.address`}
                                                    name={`contactInformation.emails.${index}.address`}
                                                    placeholder="Enter email address"
                                                    required
                                                    value={email.address}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.emails.${index}.address`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.emails.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`contactInformation.emails.${index}.type`}
                                                    name={`contactInformation.emails.${index}.type`}
                                                    value={email.type}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.emails.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    <option value="personal">Personal</option>
                                                    <option value="work">Work</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.emails.${index}.isPreferred`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Preferred
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`contactInformation.emails.${index}.isPreferred`}
                                                    name={`contactInformation.emails.${index}.isPreferred`}
                                                    value={email.isPreferred}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.emails.${index}.isPreferred`,
                                                        formik,
                                                    )}
                                                >
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </fieldset>
                                );
                            })}
                            <button
                                type="button"
                                className="btn-primary rounded-md px-4 py-2"
                                onClick={() => {
                                    arrayHelpers.push({
                                        address: "",
                                        type: "personal",
                                        isPreferred: "no",
                                    });
                                }}
                            >
                                Add Email
                            </button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ContactEmailPanel;
