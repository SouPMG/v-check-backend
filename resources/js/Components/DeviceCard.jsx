import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

export default function DeviceCard({ device, showDeviceDetails }) {
  const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy HH:mm');

  return (
    <div className="w-full p-4 md:w-2/6" key={device.id}>
      <div className="flex h-full flex-col rounded-lg bg-white p-8">
        <div className="mb-3 flex items-center">
          <div className="mr-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center  rounded-full bg-green-500 text-white">
            <FontAwesomeIcon icon={faMicrochip} />
          </div>
          <h2 className="text-lg font-medium">{device.alias}</h2>
        </div>
        <div className="flex flex-grow flex-col justify-between">
          <ul className="list-none">
            <li>SN {device.sn}</li>
            <li>Firmware v.{device.frm}</li>
            <li>
              <a className="text-blue-600" href={`mailto:${device.email}`}>
                {device.email}
              </a>
            </li>
            <li>Aggiornato al {formatDate(device.updated_at)}</li>
          </ul>
          <button
            onClick={() => showDeviceDetails(device)}
            className="mt-3 inline-flex items-center hover:text-blue-600"
          >
            Dettagli
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="ml-2 h-4 w-4"
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
