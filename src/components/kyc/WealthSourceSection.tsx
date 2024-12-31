import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import { WealthSource, WealthSourceType } from "../../models/kyc.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import PanelContainer from "../profile/PanelContainer";
import { useDisabledForm } from "../../shared/providers/DisabledFormProvider";

const WealthSourceSection = () => {
    const formik = useFormikContext<FormikValues>();
    const {
        values: { wealthSources, totalWealthSourceAmount },
        setFieldValue,
        getFieldProps,
    } = formik;
    const { isFormDisabled } = useDisabledForm();

    useEffect(() => {
        const currentTotalWealthSourceAmount = wealthSources.reduce(
            (currentTotalAmount: number, asset: WealthSource) => {
                return currentTotalAmount + asset.amount;
            },
            0,
        );
        if (currentTotalWealthSourceAmount !== totalWealthSourceAmount) {
            setFieldValue("totalWealthSourceAmount", currentTotalWealthSourceAmount);
        }
    }, [setFieldValue, wealthSources, totalWealthSourceAmount]);

    return (
        <div className="panel">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Source of Wealth (D)</h3>
            <p className="mb-4 text-sm text-gray-600">
                This section identifies the origin of your wealth, such as any inheritance or donations you may have
                received. It's important for financial transparency.
            </p>
            <FieldArray
                name="wealthSources"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.wealthSources.map((_: WealthSource, index: number) => {
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
                                                    htmlFor={`wealthSources.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`wealthSources.${index}.type`}
                                                    {...getFieldProps(`wealthSources.${index}.type`)}
                                                    {...getValidationProps(`wealthSources.${index}.type`, formik)}
                                                >
                                                    {Object.entries(WealthSourceType).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`wealthSources.${index}.amount`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Amount (Currency)
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    className="mt-2"
                                                    id={`wealthSources.${index}.amount`}
                                                    placeholder="Enter amount"
                                                    required
                                                    min={0}
                                                    {...getFieldProps(`wealthSources.${index}.amount`)}
                                                    {...getValidationProps(`wealthSources.${index}.amount`, formik)}
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            {formik.values.wealthSources?.length > 0 && (
                                <div className="mt-4">
                                    <label htmlFor="wealth-source-total" className="block text-sm font-medium">
                                        Total Source of Wealth
                                    </label>
                                    <TextInput
                                        type="number"
                                        id="wealth-source-total"
                                        placeholder="Calculated Total"
                                        color="blue"
                                        className="mt-2 rounded-xl bg-gray-200"
                                        disabled
                                        min={0}
                                        {...getFieldProps("totalWealthSourceAmount")}
                                    />
                                </div>
                            )}
                            <Button
                                className="btn-primary mt-4"
                                disabled={isFormDisabled}
                                onClick={() => {
                                    const newWealthSource: WealthSource = {
                                        type: WealthSourceType.INHERITANCE,
                                        amount: 0,
                                    };
                                    arrayHelpers.push(newWealthSource);
                                }}
                            >
                                Add Wealth of Source
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default WealthSourceSection;
