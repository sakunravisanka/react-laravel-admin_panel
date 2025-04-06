import Authenticated from "../../Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";

export default function UserEdit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <Authenticated auth={auth} header="Edit User">
            <Head title="Edit User" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Name
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

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
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

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    New Password (leave blank to keep current)
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Enter new password to change"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs italic">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {data.password && (
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="password_confirmation"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.password_confirmation
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm new password"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-end">
                                <Link
                                    href={route("users.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    disabled={processing}
                                >
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
