import * as Yup from "yup";
import {
    basicInformationSchema,
    contactInformationSchema,
    identificationDocumentsSchema,
    occupationSchema,
} from "../profile/profile.schema";

const singleIncomeSchema = Yup.object().shape({
    type: Yup.string().required("Income type is required"),
    amount: Yup.number().required("Income amount is required"),
});

const singleAssetSchema = Yup.object().shape({
    type: Yup.string().required("Asset type is required"),
    amount: Yup.number().required("Asset amount is required"),
});

const singleLiabilitySchema = Yup.object().shape({
    type: Yup.string().required("Liability type is required"),
    amount: Yup.number().required("Liability amount is required"),
});

const singleWealthSourceSchema = Yup.object().shape({
    type: Yup.string().required("Wealth source type is required"),
    amount: Yup.number().required("Wealth source amount is required"),
});

const investmentSchema = Yup.object().shape({
    experienceType: Yup.string().required("Experience type is required"),
    riskToleranceType: Yup.string().required("Risk tolerance type is required"),
});

const incomesSchema = Yup.array().of(singleIncomeSchema);

const assetsSchema = Yup.array().of(singleAssetSchema);

const liabilitiesSchema = Yup.array().of(singleLiabilitySchema);

const wealthSourcesSchema = Yup.array().of(singleWealthSourceSchema);

export const financialStatusSchema = Yup.object().shape({
    basicInformation: basicInformationSchema,
    contactInformation: contactInformationSchema,
    identificationDocuments: identificationDocumentsSchema,
    occupations: occupationSchema,
    incomes: incomesSchema,
    assets: assetsSchema,
    liabilities: liabilitiesSchema,
    wealthSources: wealthSourcesSchema,
    investment: investmentSchema,
});
