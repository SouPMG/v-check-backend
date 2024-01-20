import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SecondaryButton from "@/Components/SecondaryButton";

import { format } from "date-fns";

export default function Messages({ auth, messages }) {
    const [open, setOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const formatDate = (date) => format(new Date(date), "dd/MM/yyyy HH:mm");

    const showMessageDetail = (message) => {
        setSelectedMessage(message);
        setOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Messaggi
                </h2>
            }
        >
            <Head title="Messaggi" />

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">
                                                        Chiudi pannello
                                                    </span>
                                                    <XMarkIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        {selectedMessage && (
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                                <div className="px-4 sm:px-6">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                        Dettagli messaggio{" "}
                                                        {selectedMessage.id}
                                                    </Dialog.Title>
                                                </div>
                                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                    <div className="mt-6 border-t border-gray-100">
                                                        <dl className="divide-y divide-gray-100">
                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    ID
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.id
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    IP
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.ip
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Alias
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.alias
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Seriale
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.sn
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Email
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.email
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Versione
                                                                    firmware
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.frm
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Modello
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.model
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    OTA
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {
                                                                        selectedMessage.ota
                                                                    }
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Data
                                                                    creazione
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {formatDate(
                                                                        selectedMessage.created_at
                                                                    )}
                                                                </dd>
                                                            </div>

                                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                                                    Ultimo
                                                                    aggiornamento
                                                                </dt>
                                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                                    {formatDate(
                                                                        selectedMessage.updated_at
                                                                    )}
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="border-b-4">
                                    <th className="text-left p-4">IP</th>
                                    <th className="text-left p-4">Firmware</th>
                                    <th className="text-left p-4">Alias</th>
                                    <th className="text-left p-4">Seriale</th>
                                    <th className="text-left p-4">E-mail</th>
                                    <th className="text-right p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr className="border-b-2" key={message.id}>
                                        <td className="p-4">{message.ip}</td>
                                        <td className="p-4">{message.frm}</td>
                                        <td className="p-4">{message.alias}</td>
                                        <td className="p-4">{message.sn}</td>
                                        <td className="p-4">
                                            <a
                                                className="text-blue-600"
                                                href={`mailto:${message.email}`}
                                            >
                                                {message.email}
                                            </a>
                                        </td>
                                        <td className="text-right p-4">
                                            <SecondaryButton
                                                onClick={() =>
                                                    showMessageDetail(message)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Visualizza dettagli
                                                    messaggio
                                                </span>
                                                <ArrowRightIcon
                                                    className="h-4 w-4"
                                                    aria-hidden="true"
                                                ></ArrowRightIcon>
                                            </SecondaryButton>
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
