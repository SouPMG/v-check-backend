<?php

namespace App\Console\Commands;

use App\Models\ApiKey;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateApiKey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:apikey {device_name?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new API key for a device';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $deviceName = $this->argument('device_name') ?? 'Unknown Device';
        $key = Str::random(40);

        ApiKey::create([
            'key' => $key,
            'device_name' => $deviceName,
        ]);

        $this->info("Generated API key: {$key}");
    }
}
