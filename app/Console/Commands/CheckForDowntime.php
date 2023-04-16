<?php

namespace App\Console\Commands;

use App\Mail\OperativityDisrupted;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckForDowntime extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:downtime';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if some devices stopped sending activity signals';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $messages = Message::all();

        foreach ($messages as $message) {
            if (
                !$message->alert_sent &&
                $message->state == 1 &&
                $message->updated_at->diffInMinutes(Carbon::now()) > 5
            ) {
                Mail::to($message['email'])->send(new OperativityDisrupted($message));
                $message->alert_sent = true;
                $message->save();
            }
        }
    }
}
