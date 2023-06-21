<x-mail::message>
    <h1>Benvenuto in V-check!</h1>
    <p>La configurazione è andata a buon fine. Verrai avvisato quando ci saranno disservizi.</p>
    <p>Di seguito troverai le informazioni relative al tuo dispositivo:</p>
    <x-mail::table>
        | IP | Modello | Codice seriale | Versione firmware | OTA |
        | :-----: | :-----: | :-----: | :-----: | :-----: |
        | {{ $v_message->ip }} | {{ $v_message->model }} | {{ $v_message->sn }} | {{ $v_message->frm }} | {{ $v_message->ota }} |
    </x-mail::table>
</x-mail::message>