import {
    GetPersonalInfoDetailsResponse,
    UpdatePersonalInfoDetailsRequest,
    UpdatePersonalInfoDetailsResponse,
} from "../../models/personal.information.model";
import { baseAPISlice } from "./base.api.slice";

const personalInformationAPISlice = baseAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getPersonalInfoDetails: builder.query<GetPersonalInfoDetailsResponse, string>({
            query: (userId) => ({
                url: "/c079-ca92-4a8b-89e4",
                method: "GET",
            }),
            providesTags: ["PersonalInfoDetails"],
        }),
        updatePersonalInfoDtails: builder.mutation<UpdatePersonalInfoDetailsResponse, UpdatePersonalInfoDetailsRequest>(
            {
                query: ({ clientId: userId, body: personalInfoDetails }) => ({
                    url: "/3e52-e686-411b-b70b",
                    method: "PUT",
                    body: personalInfoDetails,
                }),
                invalidatesTags: ["PersonalInfoDetails"],
            },
        ),
    }),
});

export const { useGetPersonalInfoDetailsQuery, useUpdatePersonalInfoDtailsMutation } = personalInformationAPISlice;
