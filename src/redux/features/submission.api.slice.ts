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
                url: "/bcc4-c243-42c5-8e82",
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
