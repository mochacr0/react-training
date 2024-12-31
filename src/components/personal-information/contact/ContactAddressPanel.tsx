import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { ContactAddress, ContactAddressType } from "../../../models/profile.model";
import { getValidationProps } from "../../../hooks/useFormValidationUtils";
import PanelContainer from "../PanelContainer";
import { useDisabledForm } from "../../../providers/DisabledFormProvider";

const ContactAddressPanel = () => {
    const formik = useFormikContext<FormikValues>();
    const { getFieldProps } = formik;
    const { isFormDisabled } = useDisabledForm();

    return (
        <div className="panel">
            <h4 className="text-md mb-4 font-semibold">Addresses</h4>
            <FieldArray
                name="contactInformation.addresses"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.addresses.map((_: ContactAddress, index: number) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        onRemoveItem={arrayHelpers.remove}
                                        name="Address"
                                        index={index}
                                    >
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
                                                    placeholder="Enter country"
                                                    required
                                                    {...getFieldProps(`contactInformation.addresses.${index}.country`)}
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
                                                    placeholder="Enter city"
                                                    required
                                                    {...getFieldProps(`contactInformation.addresses.${index}.city`)}
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
                                                    placeholder="Enter street"
                                                    required
                                                    {...getFieldProps(`contactInformation.addresses.${index}.street`)}
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
                                                    placeholder="Enter postal code"
                                                    {...getFieldProps(
                                                        `contactInformation.addresses.${index}.postalCode`,
                                                    )}
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
                                                    {...getFieldProps(`contactInformation.addresses.${index}.type`)}
                                                    {...getValidationProps(
                                                        `contactInformation.addresses.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    {Object.entries(ContactAddressType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            <Button
                                className="btn-primary"
                                disabled={isFormDisabled}
                                onClick={() => {
                                    const newAddress: ContactAddress = {
                                        country: "",
                                        city: "",
                                        street: "",
                                        postalCode: "",
                                        type: ContactAddressType.MAILING,
                                    };
                                    arrayHelpers.push(newAddress);
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
