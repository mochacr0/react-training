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
    clientId: string;
    clientName: string;
    status: SubmitStatus;
    date: string;
};

export const submissions: SubmissionDTO[] = [
    {
        clientId: "client-1",
        clientName: "John Doe",
        status: SubmitStatus.ACTIVE,
        date: "2024-12-01",
    },
    {
        clientId: "client-2",
        clientName: "Jane Smith",
        status: SubmitStatus.ACTIVE,
        date: "2024-12-05",
    },
    {
        clientId: "client-3",
        clientName: "Michael Johnson",
        status: SubmitStatus.PENDING,
        date: "2024-11-20",
    },
    {
        clientId: "client-4",
        clientName: "Michael Johnson",
        status: SubmitStatus.INACTIVE,
        date: "2024-11-20",
    },
];

export interface GetSubmissionsResponse extends ApiResponse<SubmissionDTO[]> {}

export interface ProcessSubmissionRequest {
    clientId: string;
    body: {
        action: ReviewAction;
    };
}

export interface ProcessSubmissionResponse extends ApiResponse<SubmissionDTO> {}
