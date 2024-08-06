<?php

use App\Http\Controllers\Api\JwtController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

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
Route::get('refresh-token',[JwtController::class,'refreshToken']);
Route::post('registration',[RegistrationController::class,'registry'])->middleware('user.registration')->name('registration');
Route::post('login',[LoginController::class,'login'])->middleware('user.verify')->name('login');
Route::group(['middleware'=>'jwt.verify'],function(){
    Route::get('users',[UserController::class,'userList']);
    Route::get('my-rooms',[RoomController::class,'roomList']);
    Route::post('my-rooms',[RoomController::class,'storeRoom']);
    Route::get('my-rooms/search',[RoomController::class,'roomSearch']);
    Route::get('my-rooms/{id}',[RoomController::class,'currentRoom'])->middleware('room.current.verify');
    Route::post('my-rooms/{room_id}',[RoomController::class,'addUsers']);
    Route::delete('my-rooms/{id}',[RoomController::class,'deleteRoom'])->middleware('room.current.verify');
    Route::get('messages/room/{id}',[MessageController::class,'currentMessage']);
    Route::post('messages',[MessageController::class,'storeMessage'])->middleware('message.store');
    Route::get('get-me',[JwtController::class,'checkToken']);
});



