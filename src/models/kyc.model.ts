import { getTotalAmount } from "../utils/form.utils";
import { ApiResponse } from "./common.model";
import {
    PersonalInforDetailsFormValues,
    PersonalInformationDTO,
    toPersonalInfoDetailsFormValues,
} from "./personal.information.model";

export interface HasAmount {
    amount: number;
}

export enum IncomeType {
    SALARY = "Salary",
    INVESTMENT = "Invesment",
    OTHERS = "Others",
}

export interface Income extends HasAmount {
    type: IncomeType;
}

export enum AssetType {
    BOND = "Bond",
    LIQUIDITY = "Liquidity",
    REAL_ESTATE = "Real Estate",
    OTHERS = "Others",
}

export interface Asset extends HasAmount {
    type: AssetType;
}

export enum LiabilityType {
    PERSONAL_LOAN = "Personal Loan",
    REAL_ESTATE_LOAN = "Real Estate Loan",
    OTHERS = "Others",
}

export interface Liability extends HasAmount {
    type: LiabilityType;
}

export enum WealthSourceType {
    INHERITANCE = "Inheritance",
    DONATION = "Donation",
}

export interface WealthSource extends HasAmount {
    type: WealthSourceType;
}

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

export interface FinancialStatusFormValues extends PersonalInforDetailsFormValues {
    incomes: Income[];
    assets: Asset[];
    liabilities: Liability[];
    wealthSources: WealthSource[];
    investment: Investment;
    totalIncomeAmount: number;
    totalAssetAmount: number;
    totalLiabilityAmount: number;
    totalWealthSourceAmount: number;
}

export type IncomeDTO = {
    type: IncomeType;
    amount: number;
};

export type AssetDTO = {
    type: AssetType;
    amount: number;
};

export type LiabilityDTO = {
    type: LiabilityType;
    amount: number;
};

export type WealthSourceDTO = {
    type: WealthSourceType;
    amount: number;
};

export type InvestmentDTO = {
    experienceType: InvestmentExpType;
    riskToleranceType: InvestmentRiskToleranceType;
};

export interface FinancialStatusDTO extends PersonalInformationDTO {
    incomes: IncomeDTO[];
    assets: AssetDTO[];
    liabilities: LiabilityDTO[];
    wealthSources: WealthSourceDTO[];
    investment: InvestmentDTO;
}

export interface GetFinancialStatusResponse extends ApiResponse<FinancialStatusDTO> {}

export interface UpdateFinancialStatusRequest {
    userId: string;
    financialStatus: FinancialStatusFormValues;
}

export interface UpdateFinancialStatusResponse extends ApiResponse<FinancialStatusDTO> {}

export function toFinancialStatusFormValues(financialStatusDTO: FinancialStatusDTO): FinancialStatusFormValues {
    return {
        ...toPersonalInfoDetailsFormValues(financialStatusDTO),
        incomes: financialStatusDTO.incomes,
        assets: financialStatusDTO.assets,
        liabilities: financialStatusDTO.liabilities,
        wealthSources: financialStatusDTO.wealthSources,
        investment: financialStatusDTO.investment,
        totalAssetAmount: getTotalAmount(financialStatusDTO.assets),
        totalIncomeAmount: getTotalAmount(financialStatusDTO.incomes),
        totalLiabilityAmount: getTotalAmount(financialStatusDTO.liabilities),
        totalWealthSourceAmount: getTotalAmount(financialStatusDTO.wealthSources),
    };
}
