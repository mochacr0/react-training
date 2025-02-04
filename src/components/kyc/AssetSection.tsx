import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import { Asset, AssetType, IncomeType } from "../../models/kyc.model";
import { getValidationProps } from "../../hooks/useFormValidationUtils";
import PanelContainer from "../personal-information/PanelContainer";
import { useDisabledForm } from "../../providers/DisabledFormProvider";
import { handleAmountKeyDown } from "../../utils/form.utils";

const AssetSection = () => {
    const formik = useFormikContext<FormikValues>();
    const {
        values: { assets, totalAssetAmount },
        setFieldValue,
        getFieldProps,
    } = formik;
    const { isFormDisabled } = useDisabledForm();

    useEffect(() => {
        const currentTotalAssetAmount = assets.reduce((currentTotalAmount: number, asset: Asset) => {
            return currentTotalAmount + asset.amount;
        }, 0);
        if (currentTotalAssetAmount !== totalAssetAmount) {
            setFieldValue("totalAssetAmount", currentTotalAssetAmount);
        }
    }, [setFieldValue, assets, totalAssetAmount]);

    return (
        <div className="panel">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Assets (B)</h4>
            <FieldArray
                name="assets"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {formik.values.assets.map((_: Asset, index: number) => {
                                return (
                                    <PanelContainer
                                        key={index}
                                        onRemoveItem={arrayHelpers.remove}
                                        name="Asset"
                                        index={index}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor={`assets.${index}.type`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Type
                                                </label>
                                                <Select
                                                    className="mt-2"
                                                    id={`assets.${index}.type`}
                                                    {...getFieldProps(`assets.${index}.type`)}
                                                    {...getValidationProps(`assets.${index}.type`, formik)}
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
                                                    htmlFor={`assets.${index}.amount`}
                                                    className="block text-sm font-medium"
                                                >
                                                    Amount (Currency)
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    className="mt-2"
                                                    id={`assets.${index}.amount`}
                                                    placeholder="Enter amount"
                                                    required
                                                    min={0}
                                                    {...getFieldProps(`assets.${index}.amount`)}
                                                    {...getValidationProps(`assets.${index}.amount`, formik)}
                                                    onKeyDown={handleAmountKeyDown}
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
                                    const newAsset: Asset = {
                                        type: AssetType.BOND,
                                        amount: 0,
                                    };
                                    arrayHelpers.push(newAsset);
                                }}
                            >
                                Add Asset
                            </Button>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default AssetSection;
