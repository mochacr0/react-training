import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikProps } from "formik";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import { PersonalInformationFormValues } from "../../models/profile.model";

type ContactAddressPanelProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const ContactAddressPanel = ({ formik }: ContactAddressPanelProps) => {
    return (
        <div className="panel">
            <h4 className="text-md mb-4 font-semibold">Addresses</h4>
            <FieldArray
                name="contactInformation.addresses"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.addresses.map((address, index) => {
                                return (
                                    <fieldset
                                        key={index + 1}
                                        className="relative mb-6 rounded-lg border border-gray-200 p-6 shadow-md"
                                    >
                                        <legend className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1 text-sm font-medium">
                                            {`Address #${index + 1}`}
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
                                                    htmlFor={`contactInformation.addresses.${index}.country`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Country *
                                                </label>
                                                <TextInput
                                                    className="mt-2"
                                                    type="text"
                                                    id={`contactInformation.addresses.${index}.country`}
                                                    name={`contactInformation.addresses.${index}.country`}
                                                    placeholder="Enter country"
                                                    required
                                                    value={address.country}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.country`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.addresses.${index}.city`}
                                                    className="block text-sm font-medium"
                                                >
                                                    City *
                                                </label>
                                                <TextInput
                                                    className="mt-2"
                                                    type="text"
                                                    id={`contactInformation.addresses.${index}.city`}
                                                    name={`contactInformation.addresses.${index}.city`}
                                                    placeholder="Enter city"
                                                    required
                                                    value={address.city}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.city`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.addresses.${index}.street`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Street *
                                                </label>
                                                <TextInput
                                                    className="mt-2"
                                                    type="text"
                                                    id={`contactInformation.addresses.${index}.street`}
                                                    name={`contactInformation.addresses.${index}.street`}
                                                    placeholder="Enter street"
                                                    required
                                                    value={address.street}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.street`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.addresses.${index}.postalCode`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Postal Code
                                                </label>
                                                <TextInput
                                                    className="mt-2"
                                                    type="text"
                                                    id={`contactInformation.addresses.${index}.postalCode`}
                                                    name={`contactInformation.addresses.${index}.postalCode`}
                                                    placeholder="Enter postal code"
                                                    value={address.postalCode}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.postalCode`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.addresses.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type *
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`contactInformation.addresses.${index}.type`}
                                                    name={`contactInformation.addresses.${index}.type`}
                                                    value={address.type}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    <option value="mailing">Mailing</option>
                                                    <option value="work">Work</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </fieldset>
                                );
                            })}
                            <Button
                                className="btn-primary rounded-md"
                                onClick={() => {
                                    arrayHelpers.push({
                                        country: "",
                                        city: "",
                                        street: "",
                                        postalCode: "",
                                        type: "mailing",
                                    });
                                }}
                            >
                                Add Address
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ContactAddressPanel;
