import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import { Liability, LiabilityType } from "../../models/profile.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import PanelContainer from "../profile/PanelContainer";

const LiabilitySection = () => {
    const formik = useFormikContext<FormikValues>();
    const {
        values: { liabilities, totalLiabilityAmount },
        setFieldValue,
        getFieldProps,
    } = formik;

    useEffect(() => {
        const currentTotalLiabilityAmount = liabilities.reduce((currentTotalAmount: number, asset: Liability) => {
            return currentTotalAmount + asset.amount;
        }, 0);
        if (currentTotalLiabilityAmount !== totalLiabilityAmount) {
            setFieldValue("totalLiabilityAmount", currentTotalLiabilityAmount);
        }
    }, [setFieldValue, liabilities, totalLiabilityAmount]);

    return (
        <div className="panel">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Liabilities (C)</h3>
            <p className="mb-4 text-sm text-gray-600">
                Liabilities are any outstanding debts or obligations you may have. These can include loans such as
                personal loans, mortgages, or other forms of debt.
            </p>
            <FieldArray
                name="liabilities"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.liabilities.map((_: Liability, index: number) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        onRemoveItem={arrayHelpers.remove}
                                        name="Income"
                                        index={index}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`liabilities.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`liabilities.${index}.type`}
                                                    {...getFieldProps(`liabilities.${index}.type`)}
                                                    {...getValidationProps(`liabilities.${index}.type`, formik)}
                                                >
                                                    {Object.entries(LiabilityType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`liabilities.${index}.amount`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Amount (Currency)
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    className="mt-2"
                                                    id={`liabilities.${index}.amount`}
                                                    placeholder="Enter amount"
                                                    required
                                                    min={0}
                                                    {...getFieldProps(`liabilities.${index}.amount`)}
                                                    {...getValidationProps(`liabilities.${index}.amount`, formik)}
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            {formik.values.liabilities?.length > 0 && (
                                <div className="mt-4">
                                    <label htmlFor="liabilities-total" className="block text-sm font-medium">
                                        Total Liabilities
                                    </label>
                                    <TextInput
                                        type="number"
                                        id="liabilities-total"
                                        placeholder="Calculated Total"
                                        color="blue"
                                        className="mt-2 rounded-xl bg-gray-200"
                                        min={0}
                                        disabled
                                        {...getFieldProps(`totalLiabilityAmount`)}
                                    />
                                </div>
                            )}
                            <Button
                                className="btn-primary mt-4"
                                onClick={() => {
                                    const newLiability: Liability = {
                                        type: LiabilityType.PERSONAL_LOAN,
                                        amount: 0,
                                    };
                                    arrayHelpers.push(newLiability);
                                }}
                            >
                                Add Income
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default LiabilitySection;
