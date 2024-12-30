import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { ArrayHelpers, FieldArray, FormikValues, useFormikContext } from "formik";
import { toast } from "react-toastify";
import { IdentificationDocumentType } from "../../models/profile.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import PanelContainer from "./PanelContainer";

const IdentificationDocumentSection = () => {
    const formik = useFormikContext<FormikValues>();
    const { getFieldProps } = formik;

    function handleRemoveDocument(arrayHelpers: ArrayHelpers, index: number) {
        if (formik.values.identificationDocuments.length === 1) {
            toast.error("You must have at least one identification document");
            return;
        }
        arrayHelpers.remove(index);
    }

    return (
        <div className="panel mb-6">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Identification Documents</h4>
            <FieldArray
                name="identificationDocuments"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.identificationDocuments.map((_: Document, index: number) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        name="Document"
                                        index={index}
                                        onRemoveItem={(index) => {
                                            handleRemoveDocument(arrayHelpers, index);
                                        }}
                                    >
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
                                                    {...getFieldProps(`identificationDocuments.${index}.type`)}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.type`,
                                                        formik,
                                                    )}
                                                >
                                                    {Object.entries(IdentificationDocumentType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
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
                                                    {...getFieldProps(`identificationDocuments.${index}.expiryDate`)}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.expiryDate`,
                                                        formik,
                                                    )}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `identificationDocuments.${index}.expiryDate`,
                                                            event.target.value,
                                                        );
                                                    }}
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
                                                    multiple={false}
                                                    {...getFieldProps(`identificationDocuments.${index}.file`)}
                                                    {...getValidationProps(
                                                        `identificationDocuments.${index}.file`,
                                                        formik,
                                                    )}
                                                    value={formik.values?.identificationDocuments[index]?.file ?? ""}
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
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

export default IdentificationDocumentSection;
