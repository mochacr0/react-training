import { FieldArray, FormikProps } from "formik";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { Button, Select, TextInput } from "flowbite-react";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";

type OccupationSectionProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const OccupationSection = ({ formik }: OccupationSectionProps) => {
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
                                    <fieldset
                                        key={index + 1}
                                        className="relative mb-6 rounded-lg border border-gray-200 p-6 shadow-md"
                                    >
                                        <legend className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-1 text-sm font-medium">
                                            {`Occupation #${index + 1}`}
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
                                                    <option value="unemployed">Unemployed</option>
                                                    <option value="engineer">Engineer</option>
                                                    <option value="teacher">Teacher</option>
                                                    <option value="doctor">Doctor</option>
                                                    <option value="others">Others</option>
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
                                    </fieldset>
                                );
                            })}
                            <Button
                                className="btn-primary rounded-md"
                                onClick={() => {
                                    arrayHelpers.push({
                                        title: "unemployed",
                                        fromDate: "",
                                        toDate: "",
                                    });
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
