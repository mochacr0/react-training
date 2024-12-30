import {
    GetFinancialStatusResponse,
    UpdateFinancialStatusRequest,
    UpdateFinancialStatusResponse,
} from "../../models/kyc.model";
import { baseAPISlice } from "./base.api.slice";

const kycAPISlice = baseAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getFinancialStatus: builder.query<GetFinancialStatusResponse, string>({
            query: (userId) => ({
                url: "/8d53-497a-4d05-a244",
                method: "GET",
            }),
            providesTags: ["FinancialStatus"],
        }),
        updateFinancialStatus: builder.mutation<UpdateFinancialStatusResponse, UpdateFinancialStatusRequest>({
            query: ({ userId, financialStatus }) => ({
                url: "/b62f-bfe5-43d4-95df",
                method: "PUT",
                body: financialStatus,
            }),
            invalidatesTags: ["FinancialStatus"],
        }),
    }),
});

export const { useGetFinancialStatusQuery, useUpdateFinancialStatusMutation } = kycAPISlice;
