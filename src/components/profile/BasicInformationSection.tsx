import dayjs from "dayjs";
import { TextInput } from "flowbite-react";
import { FormikValues, useFormikContext } from "formik";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";

const BasicInformationSection = () => {
    const formik = useFormikContext<FormikValues>();
    const { getFieldProps } = formik;

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
                        {...getFieldProps("basicInformation.firstName")}
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
                        {...getFieldProps("basicInformation.lastName")}
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
                        {...getFieldProps("basicInformation.middleName")}
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
                        {...getFieldProps("basicInformation.dateOfBirth")}
                        {...getValidationProps("basicInformation.dateOfBirth", formik)}
                        onChange={(event) => {
                            const dateOfBirthStringValue = event.target.value;
                            formik.setFieldValue("basicInformation.dateOfBirth", dateOfBirthStringValue);
                            const age = dayjs().diff(dayjs(dateOfBirthStringValue), "year");
                            formik.setFieldValue("basicInformation.age", age);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium">
                        Age
                    </label>
                    <TextInput
                        type="text"
                        className="mt-2 rounded-xl bg-gray-200"
                        id="age"
                        placeholder="Automatically calculated"
                        {...getFieldProps("basicInformation.age")}
                        {...getValidationProps("basicInformation.age", formik)}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicInformationSection;
