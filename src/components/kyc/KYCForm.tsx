const KYCForm = () => {
    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Financial Status</h2>
            <form className="mt-6 space-y-6">
                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Incomes (A)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="income-type" className="block text-sm font-medium">
                                Type
                            </label>
                            <select
                                id="income-type"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="salary">Salary</option>
                                <option value="investment">Investment</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="income-amount" className="block text-sm font-medium">
                                Amount (Currency)
                            </label>
                            <input
                                type="number"
                                id="income-amount"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Income
                    </button>
                </div>

                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Assets (B)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="asset-type" className="block text-sm font-medium">
                                Type
                            </label>
                            <select
                                id="asset-type"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="bond">Bond</option>
                                <option value="liquidity">Liquidity</option>
                                <option value="real-estate">Real Estate</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="asset-amount" className="block text-sm font-medium">
                                Amount (Currency)
                            </label>
                            <input
                                type="number"
                                id="asset-amount"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Asset
                    </button>
                </div>

                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Liabilities (C)</h3>
                    <p className="mb-4 text-sm text-gray-600">
                        Liabilities are any outstanding debts or obligations you may have. These can include loans such
                        as personal loans, mortgages, or other forms of debt.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="liability-type" className="block text-sm font-medium">
                                Type
                            </label>
                            <select
                                id="liability-type"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="personal-loan">Personal Loan</option>
                                <option value="real-estate-loan">Real Estate Loan</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="liability-amount" className="block text-sm font-medium">
                                Amount (Currency)
                            </label>
                            <input
                                type="number"
                                id="liability-amount"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="liabilities-total" className="block text-sm font-medium">
                            Total Liabilities
                        </label>
                        <input
                            type="number"
                            id="liabilities-total"
                            className="focus:ring-secondary-color mt-2 w-full rounded-md border bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2"
                            placeholder="Calculated Total"
                            readOnly
                        />
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Liability
                    </button>
                </div>

                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Source of Wealth (D)</h3>
                    <p className="mb-4 text-sm text-gray-600">
                        This section identifies the origin of your wealth, such as any inheritance or donations you may
                        have received. It's important for financial transparency.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="wealth-type" className="block text-sm font-medium">
                                Type
                            </label>
                            <select
                                id="wealth-type"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="inheritance">Inheritance</option>
                                <option value="donation">Donation</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="wealth-amount" className="block text-sm font-medium">
                                Amount (Currency)
                            </label>
                            <input
                                type="number"
                                id="wealth-amount"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="wealth-total" className="block text-sm font-medium">
                            Total Source of Wealth
                        </label>
                        <input
                            type="number"
                            id="wealth-total"
                            className="focus:ring-secondary-color mt-2 w-full rounded-md border bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2"
                            placeholder="Calculated Total"
                            readOnly
                        />
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Source of Wealth
                    </button>
                </div>

                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Net Worth</h3>
                    <div>
                        <label htmlFor="net-worth-total" className="block text-sm font-medium">
                            Total
                        </label>
                        <input
                            type="number"
                            id="net-worth-total"
                            className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            placeholder="Automatically calculated"
                            disabled
                        />
                    </div>
                </div>

                <div className="panel">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Investment Experience and Objectives</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="investment-experience" className="block text-sm font-medium">
                                Experience in Financial Markets
                            </label>
                            <select
                                id="investment-experience"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="<5-years">{"< 5 years"}</option>
                                <option value="5-10-years">{"> 5 and < 10 years"}</option>
                                <option value=">10-years">{"> 10 years"}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="risk-tolerance" className="block text-sm font-medium">
                                Risk Tolerance
                            </label>
                            <select
                                id="risk-tolerance"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            >
                                <option value="10%">10%</option>
                                <option value="30%">30%</option>
                                <option value="all-in">All-in</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default KYCForm;
