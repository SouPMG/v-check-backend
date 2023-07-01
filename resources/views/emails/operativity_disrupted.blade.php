<x-mail::message>
    <p>Abbiamo rilevato un disservizio. Mancanza della corrente elettrica o linea internet.</p>
    <p>Di seguito troverai le informazioni relative al tuo dispositivo:</p>
    <x-mail::table>
        | Codice seriale| IP | Versione firmware |
        | :-----: | :-----: | :-----: |
        | {{ $v_message->sn }} | {{ $v_message->ip }} | {{ $v_message->frm }} |
    </x-mail::table>
</x-mail::message>