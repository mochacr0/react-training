import {
    GetSubmissionsResponse,
    ProcessSubmissionRequest,
    ProcessSubmissionResponse,
} from "../../models/submission.model";
import { baseAPISlice } from "./base.api.slice";

const submissionAPISlice = baseAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        getSubmissions: builder.query<GetSubmissionsResponse, void>({
            query: () => ({
                url: "0b96-41b7-46f8-8658",
                method: "GET",
            }),
            providesTags: ["Submission"],
        }),
        getSubmissionsByClientId: builder.query<GetSubmissionsResponse, string>({
            query: (clientId) => ({
                url: `/05a6-d293-4234-9e3c`,
                method: "GET",
            }),
            providesTags: ["MySubmission"],
        }),
        processSubmission: builder.mutation<ProcessSubmissionResponse, ProcessSubmissionRequest>({
            query: ({ clientId, body }) => ({
                url: "/94a9-61a7-4ddc-abdd",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Submission"],
        }),
    }),
});

export const { useGetSubmissionsQuery, useProcessSubmissionMutation, useGetSubmissionsByClientIdQuery } =
    submissionAPISlice;
