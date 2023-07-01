<?php

use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/mailable/initial-configuration', function () {
    $message = Message::where('state', 1)->first();

    return new App\Mail\InitialConfiguration($message);
});

Route::get('/mailable/internet-restored', function () {
    $message = Message::where('state', 1)->first();
    $downtime_delta = $message->updated_at->diff(Carbon::now())->format('%dg %Ho %Im %Ss');

    return new App\Mail\InternetRestored($message, $downtime_delta);
});

Route::get('/mailable/operativity-disrupted', function () {
    $message = Message::where('state', 1)->first();

    return new App\Mail\OperativityDisrupted($message);
});

Route::get('/mailable/operativity-restored', function () {
    $message = Message::where('state', 1)->first();
    $downtime_delta = $message->updated_at->diff(Carbon::now())->format('%dg %Ho %Im %Ss');

    return new App\Mail\OperativityRestored($message, $downtime_delta);
});

Route::get('/mailable/software-updated', function () {
    $message = Message::where('state', 1)->first();

    return new App\Mail\SoftwareUpdated($message);
});
