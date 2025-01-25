<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/user_role', [App\Http\Controllers\UserRoleController::class, 'index']);
Route::get('/user_role/create', [App\Http\Controllers\UserRoleController::class, 'create']);
Route::post('/user_role', [App\Http\Controllers\UserRoleController::class, 'store']);
Route::get('/user_role/{id}', [App\Http\Controllers\UserRoleController::class, 'show']);
Route::get('/user_role/{id}/edit', [App\Http\Controllers\UserRoleController::class, 'edit']);
Route::put('/user_role/{id}', [App\Http\Controllers\UserRoleController::class, 'update']);
Route::delete('/user_role/{id}', [App\Http\Controllers\UserRoleController::class, 'destroy']);
