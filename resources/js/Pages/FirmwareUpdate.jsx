import { Head } from '@inertiajs/react';

import FirmwareUpdateForm from '@/Components/FirmwareUpdateForm';
import FirmwareUpdateUploader from '@/Components/FirmwareUpdateUploader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function FirmwareUpdate({ auth, users }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Aggiornamento firmware</h2>}
    >
      <Head title="Aggiornamento firmware" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h3 className="text-2xl">Carica un pacchetto di aggiornamento</h3>
        <FirmwareUpdateUploader />

        <div className="my-5 flex items-center">
          <hr className="flex-grow" />
          <span className="mx-3">oppure</span>
          <hr className="flex-grow" />
        </div>

        <h3 className="text-2xl">Invia un pacchetto di aggiornamento software vial email</h3>
        <FirmwareUpdateForm users={users} />
      </div>
    </AuthenticatedLayout>
  );
}
