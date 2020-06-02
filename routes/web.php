<?php
use Illuminate\Support\Str;
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

Route::redirect('/', '/laravel-websockets/1.0/index.html');
Route::redirect('/docs/', '/laravel-websockets/1.0/index.html');
Route::get('/laravel-websockets/', function () {
	return redirect()->away('https://beyondco.de/docs/laravel-websockets/', 301);
});
Route::get('/laravel-websockets/{url?}', function ($url = '') {
	$url = Str::after($url, '1.0/');
	$url = Str::before($url, '.html');

	if ($url === 'index') {
		$url = '';
	}

	return redirect()->away('https://beyondco.de/docs/laravel-websockets/'.$url, 301);
})->where('url', '.*');