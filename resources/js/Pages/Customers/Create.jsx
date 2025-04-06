import Authenticated from "../../Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CustomerCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("customers.store"));
    };

    return (
        <Authenticated auth={auth} header="Create Customer">
            <Head title="Create Customer" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-4">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.name ? "border-red-500" : ""
                                        }`}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.phone ? "border-red-500" : ""
                                        }`}
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.address
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows="3"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <Link
                                    href={route("customers.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    disabled={processing}
                                >
                                    Create Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
