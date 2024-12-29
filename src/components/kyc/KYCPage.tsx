import { Button, HR } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import {
    FinancialStatusFormValues,
    IdentificationDocumentType,
    InvestmentExpType,
    InvestmentRiskToleranceType,
} from "../../models/profile.model";
import ErrorFocuser from "../ErrorFocuser";
import BasicInformationSection from "../profile/BasicInformationSection";
import ContactInformationSection from "../profile/contact/ContactInformationSection";
import IdentificationDocumentSection from "../profile/IdentificationDocumentSection";
import OccupationSection from "../profile/OccupationSection";
import AssetSection from "./AssetSection";
import IncomeSection from "./IncomeSection";
import InvestmentSection from "./InvestmentSection";
import { financialStatusSchema } from "./kyc.schema";
import LiabilitySection from "./LiabilitySection";
import NetWorthSection from "./NetWorthSection";
import WealthSourceSection from "./WealthSourceSection";

const initialFormValues: FinancialStatusFormValues = {
    basicInformation: {
        firstName: "",
        lastName: "",
        middleName: "",
        dateOfBirth: "",
        age: "",
    },
    contactInformation: {
        addresses: [],
        emails: [],
        phones: [],
    },
    identificationDocuments: [
        {
            type: IdentificationDocumentType.PASSPORT,
            expiryDate: "",
            file: null,
        },
    ],
    occupations: [],
    incomes: [],
    assets: [],
    liabilities: [],
    wealthSources: [],
    investment: {
        experienceType: InvestmentExpType.LESS_THAN_5_YEARS,
        riskToleranceType: InvestmentRiskToleranceType.TEN_PERCENT,
    },
    totalIncomeAmount: 0,
    totalAssetAmount: 0,
    totalLiabilityAmount: 0,
    totalWealthSourceAmount: 0,
};

const KYCPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    function handleSubmit(values: FinancialStatusFormValues) {
        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("KYC form submitted successfully");
            setIsSubmitting(false);
        }, 2000);
    }

    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Financial Status</h2>
            <Formik initialValues={initialFormValues} validationSchema={financialStatusSchema} onSubmit={handleSubmit}>
                {(formikHelpers) => {
                    return (
                        <Form noValidate className="mt-6 space-y-6">
                            <BasicInformationSection />
                            <ContactInformationSection />
                            <IdentificationDocumentSection />
                            <OccupationSection />
                            <HR />
                            <IncomeSection />
                            <AssetSection />
                            <LiabilitySection />
                            <WealthSourceSection />
                            <NetWorthSection />
                            <InvestmentSection />
                            <HR />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="btn-primary rounded-md px-4 py-2"
                                    isProcessing={isSubmitting}
                                    // disabled={shouldDisableButton(formikHelpers, isSubmitting)}
                                >
                                    Submit
                                </Button>
                            </div>
                            <ErrorFocuser />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default KYCPage;
