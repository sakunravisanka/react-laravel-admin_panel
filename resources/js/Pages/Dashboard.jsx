import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <Authenticated auth={auth} header="Dashboard">
            <Head title="Dashboard" />

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    You're logged in as {auth.user.name}!
                </div>
            </div>
        </Authenticated>
    );
}
