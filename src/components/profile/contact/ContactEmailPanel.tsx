import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import {
    ContactEmail,
    ContactPurposeType,
    PersonalInformationFormValues,
    PreferContactOption,
} from "../../../models/profile.model";
import { getValidationProps } from "../../../shared/hooks/useFormValidationUtils";
import PanelContainer from "../PanelContainer";

const ContactEmailPanel = () => {
    const formik = useFormikContext<PersonalInformationFormValues>();

    return (
        <div className="panel">
            <h4 className="text-md mb-4 font-semibold">Emails</h4>
            <FieldArray
                name="contactInformation.emails"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.contactInformation.emails.map((email, index) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        onRemoveItem={arrayHelpers.remove}
                                        name="Email"
                                        index={index}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.emails.${index}.address`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Email Address *
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
                                                    Type *
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
                                                    {Object.entries(ContactPurposeType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`contactInformation.emails.${index}.isPreferred`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Preferred *
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
                                                    {Object.entries(PreferContactOption).map(([key, value]) => (
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
                                className="btn-primary rounded-md"
                                onClick={() => {
                                    const newEmail: ContactEmail = {
                                        address: "",
                                        type: ContactPurposeType.PERSONAL,
                                        isPreferred: PreferContactOption.NO,
                                    };
                                    arrayHelpers.push(newEmail);
                                }}
                            >
                                Add Email
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default ContactEmailPanel;
