<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\User\LoginController;
use App\Http\Controllers\User\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Register Route
Route::post('register', [RegisterController::class, 'register'])->name('register');
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);

Route::prefix('task')->name('task.')->group(function () {
    Route::middleware('auth:sanctum')->get('/get', [TaskController::class, 'get']);
    Route::middleware('auth:sanctum')->post('/create', [TaskController::class, 'create']);
    Route::middleware('auth:sanctum')->post('/update/{id}', [TaskController::class, 'update']);
    Route::middleware('auth:sanctum')->delete('/delete/{id}', [TaskController::class, 'delete']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('logout', [LoginController::class, 'logout'])->name('logout');
