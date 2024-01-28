import { Head, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function FirmwareUpdate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        version: "",
        link: "",
        changelog: "",
    });

    const handleSubmit = () => {
        console.log("submitted", data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Aggiornamento firmware
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl">
                    Invia un pacchetto di aggiornamento software
                </h1>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col">
                        <InputLabel htmlFor="version" value="Nuova versione" />

                        <TextInput
                            id="version"
                            name="version"
                            placeholder="Versione firmware aggiornato"
                            value={data.version}
                            isFocused={true}
                            onChange={(e) => setData("version", e.target.value)}
                        ></TextInput>

                        <InputError message={errors.version} className="mt-2" />
                    </div>

                    <div className="flex flex-col">
                        <InputLabel
                            htmlFor="link"
                            value="Nuovo pacchetto firmware"
                        />

                        <TextInput
                            id="link"
                            name="link"
                            placeholder="Inserisci il link al pacchetto della nuova versione"
                            value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                        ></TextInput>

                        <InputError message={errors.link} className="mt-2" />
                    </div>

                    <div className="flex flex-col">
                        <InputLabel htmlFor="changelog" value="Changelog" />

                        <TextArea
                            id="changelog"
                            name="changelog"
                            placeholder="Descrivi cos'è cambiato..."
                            value={data.changelog}
                            onChange={(e) =>
                                setData("changelog", e.target.value)
                            }
                        ></TextArea>

                        <InputError
                            message={errors.changelog}
                            className="mt-2"
                        />
                    </div>

                    <PrimaryButton
                        disabled={processing}
                        className="flex justify-center"
                        type="submit"
                    >
                        Invia
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
