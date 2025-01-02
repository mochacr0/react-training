import { Button } from "flowbite-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
    FinancialStatusFormValues,
    InvestmentExpType,
    InvestmentRiskToleranceType,
    toFinancialStatusFormValues,
    UpdateFinancialStatusRequest,
} from "../../models/kyc.model";
import { IdentificationDocumentType } from "../../models/profile.model";
import { useGetFinancialStatusQuery, useUpdateFinancialStatusMutation } from "../../redux/features/kyc.api.slice";
import BasicInformationSection from "../personal-information/BasicInformationSection";
import IdentificationDocumentSection from "../personal-information/IdentificationDocumentSection";
import OccupationSection from "../personal-information/OccupationSection";
import LoadingSpinner from "../common/LoadingSpinner";
import AssetSection from "./AssetSection";
import IncomeSection from "./IncomeSection";
import InvestmentSection from "./InvestmentSection";
import { financialStatusSchema } from "./kyc.schema";
import LiabilitySection from "./LiabilitySection";
import NetWorthSection from "./NetWorthSection";
import WealthSourceSection from "./WealthSourceSection";
import { useCurrentUserContext } from "../../providers/CurrentUserProvider";
import { useDisabledForm } from "../../providers/DisabledFormProvider";
import { UserRole } from "../../models/user.model";
import ContactInformationSection from "../personal-information/ContactInformationSection";
import ErrorFocuser from "../common/ErrorFocuser";

const defaultInitialFormValues: FinancialStatusFormValues = {
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

const KYCForm = () => {
    const { clientId } = useParams();
    const { data, isLoading } = useGetFinancialStatusQuery(clientId ?? "");
    const [initialFormValues, setInitialFormValues] = useState<FinancialStatusFormValues>(defaultInitialFormValues);
    const [updateFinancialStatus, updateFinancialStatusMutation] = useUpdateFinancialStatusMutation();
    const { currentUser } = useCurrentUserContext();
    const { isFormDisabled, updateIsFormDisabled } = useDisabledForm();

    const financialStatusDTO = data?.data;

    useEffect(() => {
        if (currentUser?.role === UserRole.OFFICER) {
            updateIsFormDisabled(true);
        }
    }, [currentUser, updateIsFormDisabled]);

    useEffect(() => {
        if (!financialStatusDTO) {
            return;
        }

        const formValues: FinancialStatusFormValues = toFinancialStatusFormValues(financialStatusDTO);
        setInitialFormValues(formValues);
    }, [financialStatusDTO]);

    async function handleSubmit(
        values: FinancialStatusFormValues,
        formikHelpers: FormikHelpers<FinancialStatusFormValues>,
    ) {
        try {
            const updatedFinancialStatusRequest: UpdateFinancialStatusRequest = {
                userId: "1234",
                financialStatus: values,
            };
            const response = await updateFinancialStatus(updatedFinancialStatusRequest).unwrap();
            if (response.errors) {
                throw new Error(response.errors[0]);
            }

            formikHelpers.resetForm();
            toast.success("Financial status updated successfully");
            return;
        } catch (error) {
            let errorMessage = "Unknown error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error("Failed to update financial status: " + errorMessage);
        }
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Formik
            initialValues={initialFormValues}
            validationSchema={financialStatusSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {(formik) => {
                return (
                    <Form noValidate>
                        <fieldset disabled={isFormDisabled} className="space-y-6">
                            <ErrorFocuser />
                            <BasicInformationSection />
                            <ContactInformationSection />
                            <IdentificationDocumentSection />
                            <OccupationSection />
                            <IncomeSection />
                            <AssetSection />
                            <LiabilitySection />
                            <WealthSourceSection />
                            <NetWorthSection />
                            <InvestmentSection />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="btn-primary rounded-md px-4 py-2"
                                    isProcessing={updateFinancialStatusMutation.isLoading}
                                    disabled={updateFinancialStatusMutation.isLoading || !formik.dirty}
                                >
                                    Submit
                                </Button>
                            </div>
                        </fieldset>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default KYCForm;
