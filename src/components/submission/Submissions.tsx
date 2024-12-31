import { Badge, Button, Modal, Pagination } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ProcessSubmissionRequest, ReviewAction, SubmitStatus } from "../../models/submission.model";
import { useGetSubmissionsQuery, useProcessSubmissionMutation } from "../../redux/features/submission.api.slice";
import LoadingSpinner from "../common/LoadingSpinner";

const submitStatusColors = {
    [SubmitStatus.ACTIVE]: "green",
    [SubmitStatus.PENDING]: "yellow",
    [SubmitStatus.INACTIVE]: "red",
};

const Submissions = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [action, setAction] = useState<ReviewAction>(ReviewAction.APPROVE);
    const { data, isLoading } = useGetSubmissionsQuery();
    const [processSubmission, processSubmissionMutation] = useProcessSubmissionMutation();

    const submissions = data?.data;

    function handleAction(clientId: string, action: ReviewAction) {
        setSelectedClientId(clientId);
        setAction(action);
        setOpenModal(true);
    }

    async function handleProcessSubmission() {
        if (!selectedClientId) {
            setOpenModal(false);
            toast.error("No submission selected");
            return;
        }

        try {
            const processSubmissionRequest: ProcessSubmissionRequest = {
                clientId: selectedClientId,
                body: {
                    action: action,
                },
            };
            const response = await processSubmission(processSubmissionRequest).unwrap();
            if (response?.errors) {
                throw new Error(response.errors[0]);
            }

            toast.success(`Submission ${action.toLowerCase()}ed successfully`);
            return;
        } catch (error) {
            let errorMessage = "Unknown error";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error("Failed to process submission: " + errorMessage);
        } finally {
            setOpenModal(false);
        }
    }

    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">KYC Submission</h2>
            {isLoading || !submissions ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col gap-4">
                    <table className="min-w-full table-auto border-collapse space-y-6 text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, index) => {
                                return (
                                    <tr
                                        key={submission.clientId}
                                        className="border-b bg-white hover:cursor-pointer hover:bg-gray-50"
                                        onClick={() => navigate(`/user/${submission.clientId}/pi`)}
                                    >
                                        <td className="px-6 py-4">{submission.clientName}</td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                color={submitStatusColors[submission.status]}
                                                size="sm"
                                                className="inline-flex rounded-full p-2 px-4"
                                            >
                                                {submission.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">{submission.date}</td>

                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2">
                                                <Button
                                                    color="green"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                        event.stopPropagation();
                                                        handleAction(submission.clientId, ReviewAction.APPROVE);
                                                    }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    color="red"
                                                    size="sm"
                                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                        event.stopPropagation();
                                                        handleAction(submission.clientId, ReviewAction.REJECT);
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
                    </div>
                </div>
            )}
            <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} dismissible={true}>
                <Modal.Header>Confirm Submission Action</Modal.Header>
                <Modal.Body className="flex items-center justify-start">
                    <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                        {`Are you sure you want to ${action?.toLowerCase()} this submission?`}
                    </span>
                </Modal.Body>
                <Modal.Footer className="p-4">
                    <div className="mx-3 flex w-full justify-end gap-4">
                        <Button
                            color={action === ReviewAction.APPROVE ? "success" : "failure"}
                            onClick={() => handleProcessSubmission()}
                            isProcessing={processSubmissionMutation.isLoading}
                            disabled={processSubmissionMutation.isLoading}
                        >
                            {"Yes, I'm sure"}
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => {
                                setOpenModal(false);
                                setSelectedClientId(null);
                            }}
                            disabled={processSubmissionMutation.isLoading}
                        >
                            No, cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Submissions;
