import IconDevice from "@/Components/IconDevice";

import { format } from "date-fns";

export default function DeviceCard({ device, showDeviceDetails }) {
    const formatDate = (date) => format(new Date(date), "dd/MM/yyyy HH:mm");

    return (
        <div className="p-4 w-full md:w-2/6" key={device.id}>
            <div className="flex rounded-lg h-full bg-white p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full  bg-green-500 text-white flex-shrink-0">
                        <IconDevice></IconDevice>
                    </div>
                    <h2 className="text-lg font-medium">{device.alias}</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                    <ul className="list-none">
                        <li>SN {device.sn}</li>
                        <li>
                            <a
                                className="text-blue-600"
                                href={`mailto:${device.email}`}
                            >
                                {device.email}
                            </a>
                        </li>
                        <li>Aggiornato al {formatDate(device.updated_at)}</li>
                    </ul>
                    <button
                        onClick={() => showDeviceDetails(device)}
                        className="mt-3 hover:text-blue-600 inline-flex items-center"
                    >
                        Dettagli
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
