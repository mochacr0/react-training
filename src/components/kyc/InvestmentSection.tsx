import { Select } from "flowbite-react";
import { FormikValues, useFormikContext } from "formik";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import { InvestmentExpType, InvestmentRiskToleranceType } from "../../models/profile.model";

const InvestmentSection = () => {
    const formik = useFormikContext<FormikValues>();
    const { getFieldProps } = formik;

    return (
        <div className="panel">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Investment Experience and Objectives</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="investment-experience" className="block text-sm font-medium">
                        Experience in Financial Markets
                    </label>
                    <Select
                        className="mt-2"
                        id={`investment.experienceType`}
                        {...getFieldProps(`investment.experienceType`)}
                        {...getValidationProps(`investment.experienceType`, formik)}
                    >
                        {Object.entries(InvestmentExpType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label htmlFor="risk-tolerance" className="block text-sm font-medium">
                        Risk Tolerance
                    </label>
                    <Select
                        className="mt-2"
                        id={`investment.riskToleranceType`}
                        {...getFieldProps(`investment.riskToleranceType`)}
                        {...getValidationProps(`investment.riskToleranceType`, formik)}
                    >
                        {Object.entries(InvestmentRiskToleranceType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default InvestmentSection;
