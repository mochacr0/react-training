import { TextInput } from "flowbite-react";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { FinancialStatusFormValues } from "../../models/kyc.model";

const NetWorthSection = () => {
    const {
        values: { totalIncomeAmount, totalAssetAmount, totalLiabilityAmount, totalWealthSourceAmount },
    } = useFormikContext<FinancialStatusFormValues>();
    const [netWorth, setNetWorth] = useState<number>(0);

    useEffect(() => {
        const totalAmount = totalIncomeAmount + totalAssetAmount + totalLiabilityAmount + totalWealthSourceAmount;
        setNetWorth(totalAmount);
    }, [totalIncomeAmount, totalAssetAmount, totalLiabilityAmount, totalWealthSourceAmount]);

    return (
        <div className="panel">
            <h3 className="mb-4 text-lg font-medium text-primary-900">Net Worth</h3>
            <div>
                <label htmlFor="net-worth-total" className="block text-sm font-medium">
                    Total
                </label>
                <TextInput
                    type="number"
                    id="net-worth-total"
                    className="mt-2 rounded-xl bg-gray-200"
                    placeholder="Automatically calculated"
                    disabled
                    color="blue"
                    min={0}
                    value={netWorth}
                />
            </div>
        </div>
    );
};

export default NetWorthSection;
