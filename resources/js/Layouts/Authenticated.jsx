import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Authenticated({ auth, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${
                    sidebarOpen ? "block" : "hidden"
                }`}
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 flex-shrink-0 items-center px-4 bg-indigo-600">
                        <ApplicationLogo className="h-8 w-auto text-white hidden" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-2 py-4">
                            <SidebarLinks user={auth.user} />
                        </nav>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
                    <div className="flex h-16 flex-shrink-0 items-center px-4">
                        <ApplicationLogo className="h-8 w-auto text-white hidden" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-2 py-4">
                            <SidebarLinks user={auth.user} />
                        </nav>
                    </div>
                </div>
            </div>

            <div className="lg:pl-64">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <div className="flex flex-1 justify-end px-4">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="text-sm font-medium text-gray-700">
                                {auth.user.name} ({auth.user.role})
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="ml-4 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>

                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {header && (
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {header}
                            </h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLinks({ user }) {
    return (
        <div className="space-y-1">
            <NavLink href={route("dashboard")} icon="home" label="Dashboard" />

            {/* Admin Only Links */}
            {user.role === "admin" && (
                <>
                    <div className="px-2 py-2 text-xs font-medium text-indigo-300 uppercase tracking-wider">
                        Admin
                    </div>
                    <NavLink
                        href={route("users.index")}
                        icon="users"
                        label="User Management"
                    />
                </>
            )}

            {/* Regular User Links */}
            <div className="px-2 py-2 text-xs font-medium text-indigo-300 uppercase tracking-wider">
                Management
            </div>
            <NavLink
                href={route("customers.index")}
                icon="user-group"
                label="Customers"
            />
            <NavLink
                href={route("products.index")}
                icon="shopping-bag"
                label="Products"
            />
            <NavLink
                href={route("invoices.index")}
                icon="document-text"
                label="Invoices"
            />
        </div>
    );
}

function NavLink({ href, icon, label }) {
    const currentRoute = route().current();
    const isActive =
        currentRoute === href.split("?")[0] ||
        currentRoute?.startsWith(href.split("?")[0] + ".");

    const iconComponents = {
        home: (
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>
        ),
        users: (
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        ),
        "user-group": (
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        "shopping-bag": (
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
            </svg>
        ),
        "document-text": (
            <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
    };

    return (
        <Link
            href={href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75"
            }`}
        >
            <span className="mr-3 h-5 w-5">{iconComponents[icon]}</span>
            {label}
        </Link>
    );
}
