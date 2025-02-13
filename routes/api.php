<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', App\Http\Controllers\UserController::class);
Route::apiResource('positions', App\Http\Controllers\PositionController::class);
Route::apiResource('languages', App\Http\Controllers\LanguageController::class);
