import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { getValidationProps } from "../../hooks/useFormValidationUtils";
import { Income, IncomeType } from "../../models/kyc.model";
import PanelContainer from "../personal-information/PanelContainer";
import { useEffect } from "react";
import { useDisabledForm } from "../../providers/DisabledFormProvider";

const IncomeSection = () => {
    const formik = useFormikContext<FormikValues>();
    const {
        values: { incomes, totalIncomeAmount },
        setFieldValue,
        getFieldProps,
    } = formik;
    const { isFormDisabled } = useDisabledForm();

    useEffect(() => {
        const newTotalIncomeAmount = incomes.reduce((currentTotalAmount: number, income: Income) => {
            return currentTotalAmount + income.amount;
        }, 0);
        if (newTotalIncomeAmount !== totalIncomeAmount) {
            setFieldValue("totalIncomeAmount", newTotalIncomeAmount);
        }
    }, [setFieldValue, incomes, totalIncomeAmount]);

    return (
        <div className="panel">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Incomes (A)</h4>
            <FieldArray
                name="incomes"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.incomes.map((_: Income, index: number) => {
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
                                                    htmlFor={`incomes.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`incomes.${index}.type`}
                                                    {...getFieldProps(`incomes.${index}.type`)}
                                                    {...getValidationProps(`incomes.${index}.type`, formik)}
                                                >
                                                    {Object.entries(IncomeType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`incomes.${index}.amount`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Amount (Currency)
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    className="mt-2"
                                                    id={`incomes.${index}.amount`}
                                                    placeholder="Enter amount"
                                                    required
                                                    min={0}
                                                    {...getFieldProps(`incomes.${index}.amount`)}
                                                    {...getValidationProps(`incomes.${index}.amount`, formik)}
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
                                    const newIncome: Income = {
                                        type: IncomeType.SALARY,
                                        amount: 0,
                                    };
                                    arrayHelpers.push(newIncome);
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

export default IncomeSection;
