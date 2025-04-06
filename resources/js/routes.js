import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// User Management
import UsersIndex from "./Pages/Users/Index";
import UserCreate from "./Pages/Users/Create";
import UserEdit from "./Pages/Users/Edit";

// Customer Management
import CustomersIndex from "./Pages/Customers/Index";
import CustomerCreate from "./Pages/Customers/Create";
import CustomerEdit from "./Pages/Customers/Edit";

// Product Management
import ProductsIndex from "./Pages/Products/Index";
import ProductCreate from "./Pages/Products/Create";
import ProductEdit from "./Pages/Products/Edit";

// Invoice Management
import InvoicesIndex from "./Pages/Invoices/Index";
import InvoiceCreate from "./Pages/Invoices/Create";
import InvoiceShow from "./Pages/Invoices/Show";

createInertiaApp({
    resolve: (name) => {
        const pages = {
            Dashboard: resolvePageComponent(
                "./Pages/Dashboard.jsx",
                import.meta.glob("./Pages/**/*.jsx")
            ),

            // Users
            "users.index": UsersIndex,
            "users.create": UserCreate,
            "users.edit": UserEdit,

            // Customers
            "customers.index": CustomersIndex,
            "customers.create": CustomerCreate,
            "customers.edit": CustomerEdit,

            // Products
            "products.index": ProductsIndex,
            "products.create": ProductCreate,
            "products.edit": ProductEdit,

            // Invoices
            "invoices.index": InvoicesIndex,
            "invoices.create": InvoiceCreate,
            "invoices.show": InvoiceShow,
        };

        return (
            pages[name] ||
            resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob("./Pages/**/*.jsx")
            )
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
