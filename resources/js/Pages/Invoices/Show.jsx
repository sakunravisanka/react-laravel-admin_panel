import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/react";

const formatCurrency = (value) => {
    const num = Number(value);
    return isNaN(num) ? "$0.00" : "$" + num.toFixed(2);
};

export default function InvoiceShow({ auth, invoice }) {
    return (
        <Authenticated auth={auth} header={`Invoice #${invoice.id}`}>
            <Head title={`Invoice #${invoice.id}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Invoice #{invoice.id}
                                </h2>
                                <p className="text-gray-600">
                                    Date:{" "}
                                    {new Date(
                                        invoice.invoice_date
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-lg font-semibold">
                                    {invoice.customer?.name || "N/A"}
                                </h3>
                                <p className="text-gray-600">
                                    {invoice.customer?.email || ""}
                                </p>
                                {invoice.customer?.phone && (
                                    <p className="text-gray-600">
                                        Phone: {invoice.customer.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Unit Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoice.items?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.product?.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatCurrency(
                                                    item.unit_price
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatCurrency(
                                                    item.total_price
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 text-right font-bold"
                                        >
                                            Total:
                                        </td>
                                        <td className="px-6 py-4 font-bold">
                                            {formatCurrency(
                                                invoice.total_amount
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex justify-end">
                            <Link
                                href={route("invoices.index")}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Back to Invoices
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
