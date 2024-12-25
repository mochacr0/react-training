import dayjs from "dayjs";
import { TextInput } from "flowbite-react";
import { FormikProps } from "formik";
import { PersonalInformationFormValues } from "../../models/profile.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";

type BasicInformationSectionProps = {
    formik: FormikProps<PersonalInformationFormValues>;
};

const BasicInformationSection = ({ formik }: BasicInformationSectionProps) => {
    return (
        <div className="panel rounded-md border p-4">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium">
                        First Name *
                    </label>
                    <TextInput
                        type="text"
                        className="mt-2"
                        placeholder="Enter your first name"
                        required
                        id="firstName"
                        name="basicInformation.firstName"
                        value={formik.values.basicInformation.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...getValidationProps("basicInformation.firstName", formik)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium">
                        Last Name *
                    </label>
                    <TextInput
                        type="text"
                        className="mt-2"
                        placeholder="Enter your last name"
                        required
                        id="lastName"
                        name="basicInformation.lastName"
                        value={formik.values.basicInformation.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...getValidationProps("basicInformation.lastName", formik)}
                    />
                </div>
                <div>
                    <label htmlFor="middleName" className="block text-sm font-medium">
                        Middle Name
                    </label>
                    <TextInput
                        type="text"
                        className="mt-2"
                        placeholder="Enter your middle name"
                        id="middleName"
                        name="basicInformation.middleName"
                        value={formik.values.basicInformation.middleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...getValidationProps("basicInformation.middleName", formik)}
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                        Date of Birth *
                    </label>
                    <TextInput
                        type="date"
                        className="mt-2"
                        required
                        id="dateOfBirth"
                        name="basicInformation.dateOfBirth"
                        value={formik.values.basicInformation.dateOfBirth}
                        onChange={(event) => {
                            const dateOfBirthStringValue = event.target.value;
                            formik.setFieldValue("basicInformation.dateOfBirth", dateOfBirthStringValue);
                            const age = dayjs().diff(dayjs(dateOfBirthStringValue), "year");
                            formik.setFieldValue("basicInformation.age", age);
                        }}
                        onBlur={formik.handleBlur}
                        {...getValidationProps("basicInformation.dateOfBirth", formik)}
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium">
                        Age
                    </label>
                    <TextInput
                        type="text"
                        className="mt-2"
                        id="age"
                        name="basicInformation.age"
                        value={formik.values.basicInformation.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        {...getValidationProps("basicInformation.age", formik)}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicInformationSection;
