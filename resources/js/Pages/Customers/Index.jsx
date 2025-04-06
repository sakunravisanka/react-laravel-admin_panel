import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function CustomersIndex({ auth, customers, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("customers.index"),
            { search: searchTerm },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Authenticated auth={auth} header="Customer Management">
            <Head title="Customers" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Customers
                            </h2>
                            <Link
                                href={route("customers.create")}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add Customer
                            </Link>
                        </div>

                        <form onSubmit={handleSearch} className="mb-4">
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="w-full px-4 py-2 border rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="hidden">
                                Search
                            </button>
                        </form>

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
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.data.length > 0 ? (
                                        customers.data.map((customer) => (
                                            <tr key={customer.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {customer.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {customer.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {customer.phone || "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route(
                                                            "customers.edit",
                                                            customer.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "customers.destroy",
                                                            customer.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                        onBefore={() =>
                                                            confirm(
                                                                "Are you sure you want to delete this customer?"
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No customers found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={customers.links} className="mt-4" />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
