import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function InvoiceCreate({ auth, customers, products }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: "",
        invoice_date: new Date().toISOString().split("T")[0],
        items: [{ product_id: "", quantity: 1 }],
    });

    const [stockError, setStockError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStockError(null); // Reset error before submission
        post(route("invoices.store"), {
            onError: (errors) => {
                // Check for stock error from backend
                if (
                    errors.message &&
                    errors.message.includes("Insufficient stock")
                ) {
                    setStockError(errors.message);
                }
            },
        });
    };

    const addItem = () => {
        setData("items", [...data.items, { product_id: "", quantity: 1 }]);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData("items", newItems);
    };

    const selectedProducts = data.items
        .map((item) => products.find((p) => p.id == item.product_id))
        .filter(Boolean);

    return (
        <Authenticated auth={auth} header="Create Invoice">
            <Head title="Create Invoice" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            {stockError && (
                                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                                    <p>{stockError}</p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="customer_id"
                                    >
                                        Customer *
                                    </label>
                                    <select
                                        id="customer_id"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.customer_id
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.customer_id}
                                        onChange={(e) =>
                                            setData(
                                                "customer_id",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Customer
                                        </option>
                                        {customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.customer_id && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.customer_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="invoice_date"
                                    >
                                        Date *
                                    </label>
                                    <input
                                        id="invoice_date"
                                        type="date"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.invoice_date
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.invoice_date}
                                        onChange={(e) =>
                                            setData(
                                                "invoice_date",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {errors.invoice_date && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.invoice_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">
                                    Items
                                </h3>
                                {errors.items && (
                                    <p className="text-red-500 text-xs italic mb-2">
                                        {errors.items}
                                    </p>
                                )}

                                {data.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end"
                                    >
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Product *
                                            </label>
                                            <select
                                                className={`w-full px-3 py-2 border rounded-md ${
                                                    errors[
                                                        `items.${index}.product_id`
                                                    ]
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                value={item.product_id}
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        "product_id",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Select Product
                                                </option>
                                                {products
                                                    .filter(
                                                        (product) =>
                                                            !selectedProducts.some(
                                                                (p) =>
                                                                    p.id ==
                                                                        product.id &&
                                                                    p.id !=
                                                                        item.product_id
                                                            ) ||
                                                            product.id ==
                                                                item.product_id
                                                    )
                                                    .map((product) => (
                                                        <option
                                                            key={product.id}
                                                            value={product.id}
                                                            className={
                                                                product.quantity <=
                                                                5
                                                                    ? "text-red-500"
                                                                    : ""
                                                            }
                                                        >
                                                            {product.name} ($
                                                            {product.price.toFixed(
                                                                2
                                                            )}
                                                            ) - Stock:{" "}
                                                            {product.quantity}
                                                            {product.quantity <=
                                                                5 &&
                                                                " (Low Stock)"}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors[
                                                `items.${index}.product_id`
                                            ] && (
                                                <p className="text-red-500 text-xs italic">
                                                    {
                                                        errors[
                                                            `items.${index}.product_id`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Quantity *
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                className={`w-full px-3 py-2 border rounded-md ${
                                                    errors[
                                                        `items.${index}.quantity`
                                                    ]
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        "quantity",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                required
                                            />
                                            {errors[
                                                `items.${index}.quantity`
                                            ] && (
                                                <p className="text-red-500 text-xs italic">
                                                    {
                                                        errors[
                                                            `items.${index}.quantity`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-gray-700 text-sm font-bold mb-2">
                                                Price
                                            </p>
                                            <p className="px-3 py-2 bg-gray-100 rounded-md">
                                                {item.product_id
                                                    ? `$${(
                                                          products.find(
                                                              (p) =>
                                                                  p.id ==
                                                                  item.product_id
                                                          )?.price *
                                                          item.quantity
                                                      ).toFixed(2)}`
                                                    : "-"}
                                            </p>
                                        </div>

                                        <div>
                                            {data.items.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    onClick={addItem}
                                >
                                    Add Item
                                </button>
                            </div>

                            <div className="flex items-center justify-end">
                                <Link
                                    href={route("invoices.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    disabled={processing}
                                >
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
