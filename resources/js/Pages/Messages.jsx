import { Head } from '@inertiajs/react';

import { Fragment, useState } from 'react';

import DeviceCard from '@/Components/DeviceCard';
import DeviceDetails from '@/Components/DeviceDetails';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Dialog, Transition } from '@headlessui/react';

export default function Messages({ auth, messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const getDevices = () => {
    return messages.filter((message) => message.state === 1);
  };

  const getDeviceMessages = (sn) => {
    return messages.filter((message) => message.sn === sn);
  };

  const showDeviceDetails = (message) => {
    setSelectedDevice(message);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Messaggi</h2>}
    >
      <Head title="Messaggi" />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          {selectedDevice && (
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Dettaglio dispositivo {selectedDevice.sn} ({selectedDevice.alias})
                    </Dialog.Title>
                    <div className="mt-2">
                      <DeviceDetails
                        device={selectedDevice}
                        deviceMessages={getDeviceMessages(selectedDevice.sn)}
                      ></DeviceDetails>
                    </div>

                    <div className="mt-4">
                      <SecondaryButton onClick={closeModal}>Chiudi</SecondaryButton>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </Dialog>
      </Transition>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap">
        {getDevices().map((device) => (
          <DeviceCard key={device.id} device={device} showDeviceDetails={showDeviceDetails}></DeviceCard>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
