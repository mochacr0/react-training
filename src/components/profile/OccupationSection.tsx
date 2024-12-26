import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, useFormikContext } from "formik";
import { Occupation, OccupationTitle, PersonalInformationFormValues } from "../../models/profile.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import PanelContainer from "./PanelContainer";

const OccupationSection = () => {
    const formik = useFormikContext<PersonalInformationFormValues>();

    return (
        <div className="panel mb-6">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Occupations</h4>
            <FieldArray
                name="occupations"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.occupations.map((occupation, index) => {
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
                                                    name={`occupations.${index}.title`}
                                                    value={occupation.title}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
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
                                                    name={`occupations.${index}.fromDate`}
                                                    value={occupation.fromDate}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `occupations.${index}.fromDate`,
                                                            event.target.value,
                                                        );
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(`occupations.${index}.fromDate`, formik)}
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
                                                    name={`occupations.${index}.toDate`}
                                                    value={occupation.toDate}
                                                    onChange={(event) => {
                                                        formik.setFieldValue(
                                                            `occupations.${index}.toDate`,
                                                            event.target.value,
                                                        );
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    {...getValidationProps(`occupations.${index}.toDate`, formik)}
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            <Button
                                className="btn-primary rounded-md"
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
