import { Head, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

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
                <div className="grid grid-cols-2 gap-4">
                    <ul className="w-80 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
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

                    <div>
                        <PrimaryButton onClick={createSerialNumber}>
                            Genera SN
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
