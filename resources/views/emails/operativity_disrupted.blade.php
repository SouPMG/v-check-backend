<x-mail::message>
    <p>Abbiamo rilevato un disservizio della corrente elettrica.</p>
    <p>Di seguito troverai le informazioni relative al tuo dispositivo:</p>
    <x-mail::table>
        | IP | Modello | Codice seriale | Versione firmware | OTA |
        | :-----: | :-----: | :-----: | :-----: | :-----: |
        | {{ $v_message->ip }} | {{ $v_message->model }} | {{ $v_message->sn }} | {{ $v_message->frm }} | {{ $v_message->ota }} |
    </x-mail::table>
</x-mail::message>