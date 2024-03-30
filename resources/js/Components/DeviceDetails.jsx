import { format } from 'date-fns';

export default function DeviceDetails({ device, deviceMessages }) {
  const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy HH:mm');

  const getMessageLastUpdate = (state) => {
    return deviceMessages.find((message) => message.state === state).updated_at;
  };

  return (
    <dl className="max-w-md text-gray-900">
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">Indirizzo IP</dt>
        <dd className="font-semibold">{device.ip}</dd>
      </div>
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">Versione firmware</dt>
        <dd className="font-semibold">{device.frm}</dd>
      </div>
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">OTA</dt>
        <dd className="font-semibold">{device.ota}</dd>
      </div>
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">Segnalazione inviata</dt>
        <dd className="font-semibold">
          <svg
            className={`me-2 h-3.5 w-3.5 flex-shrink-0 ${device.alert_sent ? 'text-green-500' : 'text-gray-400'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </dd>
      </div>
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">Ultimo 0 ricevuto</dt>
        <dd className="font-semibold">{formatDate(getMessageLastUpdate(0))}</dd>
      </div>
      <div className="flex flex-col pb-3">
        <dt className="text-black-500 mb-1">Ultimo 1 ricevuto</dt>
        <dd className="font-semibold">{formatDate(getMessageLastUpdate(1))}</dd>
      </div>
    </dl>
  );
}
