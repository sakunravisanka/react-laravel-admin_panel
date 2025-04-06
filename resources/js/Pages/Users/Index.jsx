import Authenticated from "../../Layouts/Authenticated";
import { Head, Link, useForm, router } from "@inertiajs/react";
import Pagination from "../../Components/Pagination";

export default function UsersIndex({ auth, users, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("users.index"), {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <Authenticated auth={auth} header="User Management">
            <Head title="Users" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Users
                    </h2>
                    <Link
                        href={route("users.create")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add User
                    </Link>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                    <div className="p-4 border-b border-gray-200">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                "Are you sure you want to delete this user?"
                                                            )
                                                        ) {
                                                            router.delete(
                                                                route(
                                                                    "users.destroy",
                                                                    user.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={users.links} className="mt-4" />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
