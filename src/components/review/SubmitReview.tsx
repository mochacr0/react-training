const SubmitReview = () => {
    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">KYC Submission</h2>

            <table className="mt-6 min-w-full table-auto space-y-6 text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
                        <td className="px-6 py-4">John Doe</td>
                        <td className="px-6 py-4">
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium leading-tight text-green-700">
                                Active
                            </span>
                        </td>
                        <td className="px-6 py-4">2024-12-01</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-green-600 hover:underline dark:text-green-500">Approve</button>
                            <button className="text-red-600 hover:underline dark:text-red-500">Reject</button>
                        </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
                        <td className="px-6 py-4">Jane Smith</td>
                        <td className="px-6 py-4">
                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium leading-tight text-yellow-700">
                                Pending
                            </span>
                        </td>
                        <td className="px-6 py-4">2024-12-05</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-green-600 hover:underline dark:text-green-500">Approve</button>
                            <button className="text-red-600 hover:underline dark:text-red-500">Reject</button>
                        </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
                        <td className="px-6 py-4">Michael Johnson</td>
                        <td className="px-6 py-4">
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium leading-tight text-red-700">
                                Inactive
                            </span>
                        </td>
                        <td className="px-6 py-4">2024-11-20</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-green-600 hover:underline dark:text-green-500">Approve</button>
                            <button className="text-red-600 hover:underline dark:text-red-500">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SubmitReview;
