import { FieldArray, FormikProps } from "formik";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { Select, TextInput } from "flowbite-react";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";

type ContactPhonePanelProps = { formik: FormikProps<PersonalInformationFormValues> };

const ContactPhonePanel = ({ formik }: ContactPhonePanelProps) => {
    return (
        <div className="panel mb-6">
            <h4 className="text-md mb-4 font-semibold">Phones</h4>
            <FieldArray
                name="contactInformation.phones"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.phones.map((phone, index) => {
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
                                                    htmlFor={`contactInformation.phones.${index}.number`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Phone Number
                                                </label>
                                                <TextInput
                                                    type="text"
                                                    className="mt-2"
                                                    id={`contactInformation.phones.${index}.number`}
                                                    name={`contactInformation.phones.${index}.number`}
                                                    placeholder="Enter phone address"
                                                    required
                                                    value={phone.number}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.phones.${index}.number`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.phones.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`contactInformation.phones.${index}.type`}
                                                    name={`contactInformation.phones.${index}.type`}
                                                    value={phone.type}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.phones.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    <option value="personal">Personal</option>
                                                    <option value="work">Work</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.phones.${index}.isPreferred`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Preferred
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`contactInformation.phones.${index}.isPreferred`}
                                                    name={`contactInformation.phones.${index}.isPreferred`}
                                                    value={phone.isPreferred}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.phones.${index}.isPreferred`,
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
                                        number: "",
                                        type: "personal",
                                        isPreferred: "no",
                                    });
                                }}
                            >
                                Add Phone
                            </button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ContactPhonePanel;
