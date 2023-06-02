<?php

use App\Models\Message;
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
    return new App\Mail\InitialConfiguration();
});

Route::get('/mailable/internet-restored', function () {
    return new App\Mail\InternetRestored(10);
});

Route::get('/mailable/operativity-disrupted', function () {
    $message = Message::where('state', 1)->first();

    return new App\Mail\OperativityDisrupted($message);
});

Route::get('/mailable/initial-configuration', function () {
    return new App\Mail\InitialConfiguration();
});

Route::get('/mailable/operativity-restored', function () {
    return new App\Mail\OperativityRestored(5);
});

Route::get('/mailable/software-updated', function () {
    return new App\Mail\SoftwareUpdated();
});
