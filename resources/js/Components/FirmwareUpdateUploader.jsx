import { useForm } from '@inertiajs/react';

import { useState } from 'react';

import Alert from './Alert';
import InputError from './InputError';
import InputLabel from './InputLabel';
import PrimaryButton from './PrimaryButton';

export default function FirmwareUpdateUploader() {
  const { data, errors, post, processing, reset, setData } = useForm({
    package: '',
  });
  const [uploadSuccessful, setUploadSuccessful] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setData('package', event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUploadSuccessful(false);

    post('/update/upload', {
      onSuccess: () => {
        reset();
        setUploadSuccessful(true);
      },
    });
  };

  return (
    <>
      <form className="mb-3 mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <InputLabel htmlFor="package" value="Pacchetto firmware" />

          <input type="file" name="package" id="package" onChange={handleFileChange} />

          <InputError message={errors.package} className="mt-2" />
        </div>

        {uploadSuccessful && <p className="text-green-400">Il file è stato caricato con successo!</p>}
      </form>

      <PrimaryButton disabled={processing} type="submit">
        Carica
      </PrimaryButton>

      <Alert className="mt-3" type="info">
        I file caricati possono essere scaricati da <code>/storage/firmwares/&lt;nome del file caricato&gt;</code>
      </Alert>
    </>
  );
}
