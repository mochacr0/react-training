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
                url: "2585-5809-412c-bc52",
                method: "GET",
            }),
            providesTags: ["Submission"],
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

export const { useGetSubmissionsQuery, useProcessSubmissionMutation } = submissionAPISlice;
