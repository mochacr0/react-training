import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { Occupation, OccupationTitle } from "../../models/personal.information.model";
import { getValidationProps } from "../../hooks/useFormValidationUtils";
import PanelContainer from "./PanelContainer";
import { useDisabledForm } from "../../providers/DisabledFormProvider";

const OccupationSection = () => {
    const formik = useFormikContext<FormikValues>();
    const { getFieldProps } = formik;
    const { isFormDisabled } = useDisabledForm();

    return (
        <div className="panel mb-6">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Occupations</h4>
            <FieldArray
                name="occupations"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.occupations.map((_: Occupation, index: number) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        name="Document"
                                        onRemoveItem={arrayHelpers.remove}
                                        index={index}
                                    >
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`occupations.${index}.title`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Occupation *
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    required
                                                    id={`occupations.${index}.title`}
                                                    {...getFieldProps(`occupations.${index}.title`)}
                                                    {...getValidationProps(`occupations.${index}.title`, formik)}
                                                >
                                                    {Object.entries(OccupationTitle).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`occupations.${index}.fromDate`}
                                                    className="block text-sm font-medium"
                                                >
                                                    From Date *
                                                </label>
                                                <TextInput
                                                    type="date"
                                                    className="mt-2"
                                                    required
                                                    id={`occupations.${index}.fromDate`}
                                                    {...getFieldProps(`occupations.${index}.fromDate`)}
                                                    {...getValidationProps(`occupations.${index}.fromDate`, formik)}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `occupations.${index}.fromDate`,
                                                            event.target.value,
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`occupations.${index}.toDate`}
                                                    className="block text-sm font-medium"
                                                >
                                                    To Date
                                                </label>
                                                <TextInput
                                                    type="date"
                                                    className="mt-2"
                                                    required
                                                    id={`occupations.${index}.toDate`}
                                                    {...getFieldProps(`occupations.${index}.toDate`)}
                                                    {...getValidationProps(`occupations.${index}.toDate`, formik)}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `occupations.${index}.toDate`,
                                                            event.target.value,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            <Button
                                className="btn-primary"
                                disabled={isFormDisabled}
                                onClick={() => {
                                    const newOccupation: Occupation = {
                                        title: OccupationTitle.UNEMPLOYED,
                                        fromDate: "",
                                        toDate: "",
                                    };
                                    arrayHelpers.push(newOccupation);
                                }}
                            >
                                Add Occupation
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default OccupationSection;
