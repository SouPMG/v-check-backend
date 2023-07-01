import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";

export default function Dashboard({ auth, messages }) {
    const formatDate = (date) => format(new Date(date), "dd/MM/yyyy");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="border-b-4">
                                    <th className="text-left p-4">ID</th>
                                    <th className="text-left p-4">IP</th>
                                    <th className="text-left p-4">Modello</th>
                                    <th className="text-left p-4">Seriale</th>
                                    <th className="text-left p-4">
                                        Versione firmware
                                    </th>
                                    <th className="text-left p-4">OTA</th>
                                    <th className="text-left p-4">E-mail</th>
                                    <th className="text-left p-4">Creato il</th>
                                    <th className="text-left p-4">
                                        Aggiornato il
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr className="border-b-2" key={message.id}>
                                        <td className="p-4">{message.id}</td>
                                        <td className="p-4">{message.ip}</td>
                                        <td className="p-4">{message.model}</td>
                                        <td className="p-4">{message.sn}</td>
                                        <td className="p-4">{message.frm}</td>
                                        <td className="p-4">{message.ota}</td>
                                        <td className="p-4">
                                            <a
                                                className="text-blue-600"
                                                href={`mailto:${message.email}`}
                                            >
                                                {message.email}
                                            </a>
                                        </td>
                                        <td className="p-4">
                                            {formatDate(message.created_at)}
                                        </td>
                                        <td className="p-4">
                                            {formatDate(message.updated_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
