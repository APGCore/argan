<?php

use App\Http\Controllers\GreetingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GreetingController::class, 'index'])->name('home');
Route::post('/greetings', [GreetingController::class, 'store'])->name('greetings.store');
