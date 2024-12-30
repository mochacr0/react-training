import { BasicInfomation, ContactInformation, IdentificationDocument, Occupation } from "./profile.model";

export enum IncomeType {
    SALARY = "Salary",
    INVESTMENT = "Invesment",
    OTHERS = "Others",
}

export type Income = {
    type: IncomeType;
    amount: number;
};

export enum AssetType {
    BOND = "Bond",
    LIQUIDITY = "Liquidity",
    REAL_ESTATE = "Real Estate",
    OTHERS = "Others",
}

export type Asset = {
    type: AssetType;
    amount: number;
};

export enum LiabilityType {
    PERSONAL_LOAN = "Personal Loan",
    REAL_ESTATE_LOAN = "Real Estate Loan",
    OTHERS = "Others",
}

export type Liability = {
    type: LiabilityType;
    amount: number;
};

export enum WealthSourceType {
    INHERITANCE = "Inheritance",
    DONATION = "Donation",
}

export type WealthSource = {
    type: WealthSourceType;
    amount: number;
};

export enum InvestmentExpType {
    LESS_THAN_5_YEARS = "< 5 years",
    BETWEEN_5_AND_10_YEARS = "> 5 and < 10 years",
    MORE_THAN_10_YEARS = "> 10 years",
}

export enum InvestmentRiskToleranceType {
    TEN_PERCENT = "10%",
    THIRTY_PERCENT = "30%",
    ALL_IN = "All-in",
}

export type Investment = {
    experienceType: InvestmentExpType;
    riskToleranceType: InvestmentRiskToleranceType;
};

export type FinancialStatusFormValues = {
    incomes: Income[];
    basicInformation: BasicInfomation;
    contactInformation: ContactInformation;
    identificationDocuments: IdentificationDocument[];
    occupations: Occupation[];
    assets: Asset[];
    liabilities: Liability[];
    wealthSources: WealthSource[];
    investment: Investment;
    totalIncomeAmount: number;
    totalAssetAmount: number;
    totalLiabilityAmount: number;
    totalWealthSourceAmount: number;
};
