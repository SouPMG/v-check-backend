import { Head, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function SerialNumbers({ auth, serialNumbers }) {
    const createSerialNumber = () => {
        router.post("/serial-number", {});
    };

    const deleteSerialNumber = (id) => {
        router.delete(`/serial-number/${id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Codici seriali
                </h2>
            }
        >
            <Head title="Codici seriali" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl">Genera codici seriali</h1>
                        <p>Clicca per generare un nuovo codice seriale randomico di 8 cifre.</p>
                        <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100" role="alert">
                            <FontAwesomeIcon className="flex-shrink-0 inline w-4 h-4 me-3" icon={faCircleInfo} />
                            <div>
                                <span className="font-medium">Attenzione!</span> Durante la registrazione di un nuovo dispositivo verrà restituito un errore qualora il codice seriale inviato non sia presente nella lista.
                            </div>
                        </div>
                        <PrimaryButton className="w-auto" onClick={createSerialNumber}>
                            Genera SN
                        </PrimaryButton>
                    </div>

                    <div className="flex flex-col justify-end">
                        <ul className="max-h-80 overflow-y-scroll text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
                            {serialNumbers.map((serialNumber) => (
                                <li
                                    className="flex justify-between w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                                    key={serialNumber.id}
                                >
                                    {serialNumber.code}{" "}
                                    <FontAwesomeIcon
                                        className="cursor-pointer text-red-700"
                                        icon={faTrashCan}
                                        onClick={() =>
                                            deleteSerialNumber(serialNumber.id)
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
