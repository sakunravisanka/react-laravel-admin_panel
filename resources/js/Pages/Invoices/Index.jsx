import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

const formatCurrency = (amount) => {
    const num = Number(amount);
    return isNaN(num) ? "$0.00" : "$" + num.toFixed(2);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
};

export default function InvoicesIndex({ auth, invoices, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("invoices.index"),
            { search: searchTerm },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this invoice?")) {
            router.delete(route("invoices.destroy", id));
        }
    };

    return (
        <Authenticated auth={auth} header="Invoice Management">
            <Head title="Invoices" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Invoices
                            </h2>
                            <Link
                                href={route("invoices.create")}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Create Invoice
                            </Link>
                        </div>

                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search by customer, date, or amount..."
                                    className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Invoice #
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.data.length > 0 ? (
                                        invoices.data.map((invoice) => (
                                            <tr
                                                key={invoice.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{invoice.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.customer?.name ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(
                                                        invoice.invoice_date
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    {formatCurrency(
                                                        invoice.total_amount
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <Link
                                                        href={route(
                                                            "invoices.show",
                                                            invoice.id
                                                        )}
                                                        className="text-indigo-600 hover:text-indigo-900 hover:underline"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                invoice.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-sm text-gray-500"
                                            >
                                                No invoices found. Create one to
                                                get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {invoices.data.length > 0 && (
                            <Pagination
                                links={invoices.links}
                                className="mt-4"
                            />
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
