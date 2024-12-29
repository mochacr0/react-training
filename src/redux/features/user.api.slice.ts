import { GetPersonalInformationResponse } from "../../models/profile.model";
import { baseAPISlice } from "./base.api.slice";

const userAPISlice = baseAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getPersonalInformation: builder.query<GetPersonalInformationResponse, string>({
            query: (userId) => ({
                url: `a5ca-9d70-404a-a43b`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetPersonalInformationQuery } = userAPISlice;
