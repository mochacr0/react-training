const ProfileForm = () => {
    return (
        <div className="mx-4 my-6 max-w-5xl rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-center text-2xl font-bold text-primary-900">Personal Information</h2>
            <form className="mt-6 space-y-6">
                <div className="panel rounded-md border p-4">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first-name"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last-name"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="middle-name" className="block text-sm font-medium">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                id="middle-name"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter your middle name"
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                placeholder="Enter your age"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="panel rounded-md border p-4">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Contact Information</h3>

                    <div className="panel mb-6">
                        <h4 className="text-md mb-4 font-semibold">Addresses</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter country"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="street" className="block text-sm font-medium">
                                    Street
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter street"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="postal-code" className="block text-sm font-medium">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    id="postal-code"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter postal code"
                                />
                            </div>
                            <div>
                                <label htmlFor="address-type" className="block text-sm font-medium">
                                    Type
                                </label>
                                <select
                                    id="address-type"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                >
                                    <option value="mailing">Mailing</option>
                                    <option value="work">Work</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                            Add Address
                        </button>
                    </div>

                    <div className="panel mb-6">
                        <h4 className="text-md mb-4 font-semibold">Emails</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email-address"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email-type" className="block text-sm font-medium">
                                    Type
                                </label>
                                <select
                                    id="email-type"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                >
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="email-preferred" className="block text-sm font-medium">
                                    Preferred
                                </label>
                                <select
                                    id="email-preferred"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                            Add Email
                        </button>
                    </div>

                    <div className="panel mb-6">
                        <h4 className="text-md mb-4 font-semibold">Phones</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone-number" className="block text-sm font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone-number"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone-type" className="block text-sm font-medium">
                                    Type
                                </label>
                                <select
                                    id="phone-type"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                >
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="phone-preferred" className="block text-sm font-medium">
                                    Preferred
                                </label>
                                <select
                                    id="phone-preferred"
                                    className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                            Add Phone
                        </button>
                    </div>
                </div>

                <div className="panel mb-6">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Identification Documents</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="id-type" className="block text-sm font-medium">
                                Type
                            </label>
                            <select
                                id="id-type"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            >
                                <option value="national-id">National ID Card</option>
                                <option value="driver-license">Driver License</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="id-expired" className="block text-sm font-medium">
                                Expiry Date
                            </label>
                            <input
                                type="date"
                                id="id-expired"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="id-file" className="block text-sm font-medium">
                                Upload Document
                            </label>
                            <input
                                type="file"
                                id="id-file"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Identification Document
                    </button>
                </div>

                <div className="panel mb-6">
                    <h3 className="mb-4 text-lg font-medium text-primary-900">Occupations</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium">
                                Occupation
                            </label>
                            <select
                                id="occupation"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            >
                                <option value="unemployed">Unemployed</option>
                                <option value="engineer">Engineer</option>
                                <option value="teacher">Teacher</option>
                                <option value="doctor">Doctor</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="occupation-from" className="block text-sm font-medium">
                                From Date
                            </label>
                            <input
                                type="date"
                                id="occupation-from"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="occupation-to" className="block text-sm font-medium">
                                To Date
                            </label>
                            <input
                                type="date"
                                id="occupation-to"
                                className="focus:ring-secondary-color mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
                            />
                        </div>
                    </div>
                    <button type="button" className="btn-primary mt-4 rounded-md px-4 py-2">
                        Add Occupation
                    </button>
                </div>

                <div className="text-right">
                    <button type="submit" className="btn-primary rounded-md px-6 py-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
