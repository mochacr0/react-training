import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import {
    ContactPhone,
    ContactPurposeType,
    PersonalInformationFormValues,
    PreferContactOption,
} from "../../../models/profile.model";
import { getValidationProps } from "../../../shared/hooks/useFormValidationUtils";
import PanelContainer from "../PanelContainer";
import { capitalize } from "../../../shared/utils";

const ContactPhonePanel = () => {
    const formik = useFormikContext<PersonalInformationFormValues>();

    return (
        <div className="panel">
            <h4 className="text-md mb-4 font-semibold">Phones</h4>
            <FieldArray
                name="contactInformation.phones"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.phones.map((phone, index) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        name="Phone"
                                        index={index}
                                        onRemoveItem={arrayHelpers.remove}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.phones.${index}.number`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Phone Number *
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
                                                    Type *
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
                                                    {Object.entries(ContactPurposeType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.phones.${index}.isPreferred`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Preferred *
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
                                                    {Object.entries(PreferContactOption).map(([key, value]) => {
                                                        return (
                                                            <option key={key} value={value}>
                                                                {capitalize(key)}
                                                            </option>
                                                        );
                                                    })}
                                                </Select>
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            <Button
                                className="btn-primary rounded-md"
                                onClick={() => {
                                    const newPhone: ContactPhone = {
                                        number: "",
                                        type: ContactPurposeType.PERSONAL,
                                        isPreferred: PreferContactOption.NO,
                                    };
                                    arrayHelpers.push(newPhone);
                                }}
                            >
                                Add Phone
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ContactPhonePanel;
