import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "https://dummyjson.com/c";

export const baseAPISlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}`,
    }),
    tagTypes: ["PersonalInfoDetails", "FinancialStatus", "Submission"],
    endpoints: () => ({}),
});
