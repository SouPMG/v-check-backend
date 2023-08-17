<x-mail::message>
    <p>Il software del tuo dispositivo è stato aggiornato all'ultima versione!</p>
    <p>Di seguito troverai le informazioni aggiornate del tuo dispositivo:</p>
    <x-mail::table>
        | Nome | Codice seriale | IP | Versione firmware |
        | :-----: | :-----: | :-----: | :-----: |
        | {{ $v_message->alias }} | {{ $v_message->sn }} | {{ $v_message->ip }} | {{ $v_message->frm }} |
    </x-mail::table>
</x-mail::message>