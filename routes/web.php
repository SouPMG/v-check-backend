<?php

use App\Models\Message;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/dashboard');
Route::get('/dashboard', [DashboardController::class, 'home'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// MAILABLES

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
