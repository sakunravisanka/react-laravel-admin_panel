import { Link } from "@inertiajs/react";

export default function Sidebar({ user }) {
    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white">
            <div className="p-4 border-b border-gray-700">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-gray-400">Welcome, {user.name}</p>
                <p className="text-xs text-gray-400">Role: {user.role}</p>
            </div>

            <nav className="mt-4">
                <div className="px-4 py-2 text-gray-400 uppercase text-xs font-semibold">
                    Main Menu
                </div>

                <Link
                    href={route("dashboard")}
                    className="block px-4 py-2 hover:bg-gray-700"
                    active={route().current("dashboard")}
                >
                    Dashboard
                </Link>

                <div className="px-4 py-2 text-gray-400 uppercase text-xs font-semibold mt-4">
                    Management
                </div>

                <Link
                    href={route("users.index")}
                    className="block px-4 py-2 hover:bg-gray-700"
                    active={route().current("users.index")}
                >
                    Users
                </Link>

                <Link
                    href={route("customers.index")}
                    className="block px-4 py-2 hover:bg-gray-700"
                    active={route().current("customers.index")}
                >
                    Customers
                </Link>

                <Link
                    href={route("products.index")}
                    className="block px-4 py-2 hover:bg-gray-700"
                    active={route().current("products.index")}
                >
                    Products
                </Link>

                <Link
                    href={route("invoices.index")}
                    className="block px-4 py-2 hover:bg-gray-700"
                    active={route().current("invoices.index")}
                >
                    Invoices
                </Link>
            </nav>
        </div>
    );
}
