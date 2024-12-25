import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikProps } from "formik";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { toast } from "react-toastify";

type IdentificationDocumentSectionsProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const IdentificationDocumentSections = ({ formik }: IdentificationDocumentSectionsProps) => {
    return (
        <div className="panel mb-6">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Identification Documents</h4>
            <FieldArray
                name="identificationDocuments"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.identificationDocuments.map((document, index) => {
                                return (
                                    <fieldset
                                        key={index + 1}
                                        className="relative mb-6 rounded-lg border border-gray-200 p-6 shadow-md"
                                    >
                                        <legend className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1 text-sm font-medium">
                                            {`Document #${index + 1}`}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (formik.values.identificationDocuments.length === 1) {
                                                        toast.error(
                                                            "You must have at least one identification document",
                                                        );
                                                        return;
                                                    }
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
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`identificationDocuments.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type *
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    required
                                                    id={`identificationDocuments.${index}.type`}
                                                    name={`identificationDocuments.${index}.type`}
                                                    value={document.type}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    <option value="passport">Passport</option>
                                                    <option value="national-id">National ID Card</option>
                                                    <option value="driver-license">Driver License</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`identificationDocuments.${index}.expiryDate`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Expiry Date *
                                                </label>
                                                <TextInput
                                                    type="date"
                                                    className="mt-2"
                                                    required
                                                    id={`identificationDocuments.${index}.expiryDate`}
                                                    name={`identificationDocuments.${index}.expiryDate`}
                                                    value={document.expiryDate}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `identificationDocuments.${index}.expiryDate`,
                                                            event.target.value,
                                                        );
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.expiryDate`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="id-file" className="block text-sm font-medium">
                                                    Upload Document *
                                                </label>
                                                <FileInput
                                                    className="mt-2"
                                                    required
                                                    id={`identificationDocuments.${index}.file`}
                                                    name={`identificationDocuments.${index}.file`}
                                                    accept="image/*, application/pdf"
                                                    multiple={false}
                                                    onChange={(event) => {
                                                        const file = event.target.files?.[0];
                                                        if (file) {
                                                            formik.setFieldValue(
                                                                `identificationDocuments.${index}.file`,
                                                                file,
                                                            );
                                                            formik.setFieldTouched(
                                                                `identificationDocuments.${index}.file`,
                                                                true,
                                                            );
                                                        }
                                                    }}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.file`,
                                                        formik,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                );
                            })}
                            <Button
                                className="btn-primary rounded-md"
                                onClick={() => {
                                    arrayHelpers.push({
                                        type: "passport",
                                        expiryDate: "",
                                        file: null,
                                    });
                                }}
                            >
                                Add Identification Document
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default IdentificationDocumentSections;
