import { Head, router } from '@inertiajs/react';

import Alert from '@/Components/Alert';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SerialNumbers({ auth, serialNumbers }) {
  const createSerialNumber = () => {
    router.post('/serial-number', {});
  };

  const deleteSerialNumber = (id) => {
    router.delete(`/serial-number/${id}`);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Codici seriali</h2>}
    >
      <Head title="Codici seriali" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl">Genera codici seriali</h1>
            <p>Clicca per generare un nuovo codice seriale randomico di 8 cifre.</p>

            <Alert className="mb-4" type="warning">
              <div>
                <span className="font-medium">Attenzione!</span> Durante la registrazione di un nuovo dispositivo verrà
                restituito un errore qualora il codice seriale inviato non sia presente nella lista.
              </div>
            </Alert>

            <PrimaryButton className="w-auto" onClick={createSerialNumber}>
              Genera SN
            </PrimaryButton>
          </div>

          <div className="flex flex-col justify-end">
            <ul className="max-h-80 overflow-y-scroll rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
              {serialNumbers.map((serialNumber) => (
                <li
                  className="flex w-full justify-between rounded-t-lg border-b border-gray-200 px-4 py-2"
                  key={serialNumber.id}
                >
                  {serialNumber.code}{' '}
                  <FontAwesomeIcon
                    className="cursor-pointer text-red-700"
                    icon={faTrashCan}
                    onClick={() => deleteSerialNumber(serialNumber.id)}
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
