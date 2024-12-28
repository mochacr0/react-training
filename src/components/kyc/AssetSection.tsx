import { Button, Select, TextInput } from "flowbite-react";
import { FieldArray, FormikValues, useFormikContext } from "formik";
import { useEffect } from "react";
import { Asset, AssetType, IncomeType } from "../../models/profile.model";
import { getValidationProps } from "../../shared/hooks/useFormValidationUtils";
import PanelContainer from "../profile/PanelContainer";

const AssetSection = () => {
    const formik = useFormikContext<FormikValues>();
    const {
        values: { assets, totalAssetAmount },
        setFieldValue,
        getFieldProps,
    } = formik;

    useEffect(() => {
        const currentTotalAssetAmount = assets.reduce((currentTotalAmount: number, asset: Asset) => {
            return currentTotalAmount + asset.amount;
        }, 0);
        if (currentTotalAssetAmount !== totalAssetAmount) {
            setFieldValue("totalAssetAmount", currentTotalAssetAmount);
        }
    }, [setFieldValue, assets, totalAssetAmount]);

    return (
        <div className="panel mb-6">
            <h4 className="mb-4 text-lg font-medium text-primary-900">Assets (A)</h4>
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
                                                />
                                            </div>
                                        </div>
                                    </PanelContainer>
                                );
                            })}
                            <Button
                                className="btn-primary"
                                onClick={() => {
                                    const newAsset: Asset = {
                                        type: AssetType.BOND,
                                        amount: 0,
                                    };
                                    arrayHelpers.push(newAsset);
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

export default AssetSection;
