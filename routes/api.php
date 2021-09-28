<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('users/pages', 'UserController@pages')->name('users.pages');
Route::get('users/getUsers', 'UserController@index')->name('users.getusers');
Route::post('users/addUser', 'UserController@store')->name('users.adduser');
Route::put('users/updateUser/{user}', 'UserController@edit')->name('users.getusers');
Route::delete('users/deleteUser/{user}', 'UserController@destroy')->name('users.deleteuser');

Route::resource('/users', 'UserController');
