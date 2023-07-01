<x-mail::message>
    <h1>Benvenuto in V-check!</h1>
    <p>La configurazione è andata a buon fine. Verrai avvisato quando ci saranno disservizi.</p>
    <p>Di seguito troverai le informazioni relative al tuo dispositivo:</p>
    <x-mail::table>
        | Codice seriale| IP | Versione firmware |
        | :-----: | :-----: | :-----: |
        | {{ $v_message->sn }} | {{ $v_message->ip }} | {{ $v_message->frm }} |
    </x-mail::table>
</x-mail::message>