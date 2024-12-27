import { Badge, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

enum Action {
    APPROVE = "Approve",
    REJECT = "Reject",
}

enum SubmitStatus {
    ACTIVE = "Active",
    PENDING = "Pending",
    INACTIVE = "Inactive",
}

type Submissions = {
    name: string;
    status: SubmitStatus;
    date: string;
};

const submissions: Submissions[] = [
    {
        name: "John Doe",
        status: SubmitStatus.ACTIVE,
        date: "2024-12-01",
    },
    {
        name: "Jane Smith",
        status: SubmitStatus.PENDING,
        date: "2024-12-05",
    },
    {
        name: "Michael Johnson",
        status: SubmitStatus.INACTIVE,
        date: "2024-11-20",
    },
];

const submitStatusColors = {
    [SubmitStatus.ACTIVE]: "green",
    [SubmitStatus.PENDING]: "yellow",
    [SubmitStatus.INACTIVE]: "red",
};

const SubmitReview = () => {
    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState<Action>(Action.APPROVE);

    function handleAction(action: Action) {
        setAction(action);
        setOpenModal(true);
    }

    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <div className="flex flex-wrap gap-2"></div>{" "}
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">KYC Submission</h2>
            <table className="mt-6 min-w-full table-auto border-collapse space-y-6 text-left text-sm text-gray-500">
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
                            <tr key={index} className="border-b bg-white hover:cursor-pointer hover:bg-gray-50">
                                <td className="px-6 py-4">{submission.name}</td>
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
                                            onClick={() => {
                                                handleAction(Action.APPROVE);
                                            }}
                                        >
                                            Approve
                                        </Button>
                                        <Button color="red" size="sm" onClick={() => handleAction(Action.REJECT)}>
                                            Reject
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
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
                            color={action === Action.APPROVE ? "success" : "failure"}
                            onClick={() => setOpenModal(false)}
                        >
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SubmitReview;
