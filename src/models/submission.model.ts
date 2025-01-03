import { ApiResponse } from "./common.model";

export enum ReviewAction {
    APPROVE = "Approve",
    REJECT = "Reject",
}

export enum SubmitStatus {
    ACTIVE = "Active",
    PENDING = "Pending",
    INACTIVE = "Inactive",
}

export type SubmissionDTO = {
    id: string;
    clientId: string;
    clientName: string;
    status: SubmitStatus;
    date: string;
};

export interface GetSubmissionsResponse extends ApiResponse<SubmissionDTO[]> {}

export interface ProcessSubmissionRequest {
    clientId: string;
    body: {
        action: ReviewAction;
    };
}

export interface ProcessSubmissionResponse extends ApiResponse<SubmissionDTO> {}
