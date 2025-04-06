import Authenticated from "../../Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ProductCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        code: "",
        cost: 0,
        price: 0,
        quantity: 0,
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <Authenticated auth={auth} header="Create Product">
            <Head title="Create Product" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Product Name *
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
                                        htmlFor="code"
                                    >
                                        Product Code *
                                    </label>
                                    <input
                                        id="code"
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.code ? "border-red-500" : ""
                                        }`}
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.code && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.code}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="cost"
                                    >
                                        Cost Price *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                                            $
                                        </span>
                                        <input
                                            id="cost"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className={`w-full pl-7 pr-3 py-2 border rounded-md ${
                                                errors.cost
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            value={data.cost}
                                            onChange={(e) =>
                                                setData(
                                                    "cost",
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    {errors.cost && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.cost}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="price"
                                    >
                                        Selling Price *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                                            $
                                        </span>
                                        <input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className={`w-full pl-7 pr-3 py-2 border rounded-md ${
                                                errors.price
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                            value={data.price}
                                            onChange={(e) =>
                                                setData(
                                                    "price",
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="quantity"
                                    >
                                        Quantity in Stock *
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="0"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.quantity
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData(
                                                "quantity",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        required
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.description
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs italic">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <Link
                                    href={route("products.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    disabled={processing}
                                >
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
