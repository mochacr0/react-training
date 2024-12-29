import { ApiResponse } from "./common.model";
import { UserRole } from "./user.model";

export type BasicInfomation = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    age: string;
};

export enum ContactAddressType {
    MAILING = "Mailing",
    WORK = "Work",
}

export type ContactAddress = {
    country: string;
    city: string;
    street: string;
    postalCode?: string;
    type: ContactAddressType;
};

export type ContactEmail = {
    address: string;
    type: ContactPurposeType;
    isPreferred: PreferContactOption;
};

export enum ContactPurposeType {
    PERSONAL = "Personal",
    WORK = "Work",
}

export enum PreferContactOption {
    YES = "Yes",
    NO = "No",
}

export type ContactPhone = {
    number: string;
    type: ContactPurposeType;
    isPreferred: PreferContactOption;
};

export type ContactInformation = {
    addresses: ContactAddress[];
    emails: ContactEmail[];
    phones: ContactPhone[];
};

export enum IdentificationDocumentType {
    PASSPORT = "Passport",
    NATIONAL_ID = "National ID Card",
    DRIVER_LICENSE = "Driver License",
}

export type IdentificationDocument = {
    type: IdentificationDocumentType;
    expiryDate: string;
    file: File | null;
};

export enum OccupationTitle {
    UNEMPLOYED = "Unemployed",
    ENGINEER = "Engineer",
    TEACHER = "Teacher",
    DOCTOR = "Doctor",
    OTHERS = "Others",
}

export type Occupation = {
    title: OccupationTitle;
    fromDate: string;
    toDate: string;
};

export type PersonalInformationFormValues = {
    contactInformation: ContactInformation;
    basicInformation: BasicInfomation;
    identificationDocuments: IdentificationDocument[];
    occupations: Occupation[];
};

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

export type PersonalInformation = {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    phoneNumber: string;
    organization: string;
    department: string;
    email: string;
    birthday: string;
    role: string;
    postalCode: string;
};

export interface GetPersonalInformationResponse extends ApiResponse<PersonalInformation> {}
