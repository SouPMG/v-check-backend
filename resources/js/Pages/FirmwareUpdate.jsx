import { Head, useForm } from '@inertiajs/react';

import { useState } from 'react';

import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function FirmwareUpdate({ auth, users }) {
  const { data, errors, post, processing, reset, setData, transform } = useForm({
    version: '',
    link: '',
    changelog: '',
  });
  const [selectedEmails, setSelectedEmails] = useState([]);

  const toggleUserEmail = (event, email) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedEmails([...selectedEmails, email]);
    } else {
      setSelectedEmails(selectedEmails.filter((userEmail) => userEmail !== email));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    transform((data) => ({
      ...data,
      emails: selectedEmails,
    }));

    post('/update', {
      onSuccess: () => {
        reset();
        setSelectedEmails([]);
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Aggiornamento firmware</h2>}
    >
      <Head title="Aggiornamento firmware" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl">Invia un pacchetto di aggiornamento software</h1>

        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputLabel htmlFor="version" value="Nuova versione" />

            <TextInput
              id="version"
              name="version"
              placeholder="Versione firmware aggiornato"
              value={data.version}
              isFocused={true}
              onChange={(e) => setData('version', e.target.value)}
            ></TextInput>

            <InputError message={errors.version} className="mt-2" />
          </div>

          <div className="flex flex-col">
            <InputLabel htmlFor="link" value="Nuovo pacchetto firmware" />

            <TextInput
              id="link"
              name="link"
              placeholder="Inserisci il link al pacchetto della nuova versione"
              value={data.link}
              onChange={(e) => setData('link', e.target.value)}
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
              onChange={(e) => setData('changelog', e.target.value)}
            ></TextArea>

            <InputError message={errors.changelog} className="mt-2" />
          </div>

          <div className="flex flex-col">
            <InputLabel value="Utenti a cui inviare la notifica" />

            {users.map((user, index) => (
              <label className="flex items-center" key={index}>
                <Checkbox
                  name="remember"
                  checked={selectedEmails.includes(user.email)}
                  onChange={(e) => toggleUserEmail(e, user.email)}
                />

                <span className="ml-2 text-sm text-gray-600">{user.email}</span>
              </label>
            ))}

            <InputError message={errors.emails} className="mt-2" />
          </div>

          <PrimaryButton disabled={processing} className="flex justify-center" type="submit">
            Invia
          </PrimaryButton>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
