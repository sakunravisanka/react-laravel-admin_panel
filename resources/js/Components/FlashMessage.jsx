import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.error || flash.success) {
            const timer = setTimeout(() => {
                flash.error = null;
                flash.success = null;
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="fixed top-4 right-4 z-50">
            {flash.error && (
                <div className="bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                    {flash.error}
                </div>
            )}
            {flash.success && (
                <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {flash.success}
                </div>
            )}
        </div>
    );
}
