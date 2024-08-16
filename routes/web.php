<?php

use App\Http\Controllers\CimientoCorridoController;
use App\Http\Controllers\ColumnaController;
use App\Http\Controllers\DesingLosaController;
use App\Http\Controllers\MuroAlbanieriaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZapatacombinadaController;
use App\Http\Controllers\ZapataconectadaController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
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

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
//==========================RUTA PARA LAS PRUEBAS PREDIM=======================//
Route::view('/admPredim', 'predim.admpredim');
//==========================RUTA PARA LAS HOJAS DE CALCULO====================//
Route::view('/admDvigas', 'hcalculo.admdesingvigas');
Route::view('/admvigasG', 'hcalculo.admvigageneral');
//===================RUTA DE LOSAS==========//
Route::view('/admlosasaligerada', 'hcalculo.admlosasaligeradas');
Route::post('/desingLosa', [DesingLosaController::class, 'store'])->name('desingLosa');

Route::view('/admlosasmaciza', 'hcalculo.admlosasmacizas');
//===================RUTA DE Muros de contencion==========//
Route::view('/admMurosContencion', 'hcalculo.admMurosContencion');
//===================RUTA DE CIMIENTO CORRIDO=============================//
Route::view('/admCimientoCorrido', 'hcalculo.admCimientoCorrido');
Route::post('/cimientocorrido', [CimientoCorridoController::class, 'cimientocorrido'])->name('cimientocorrido');
//===================RUTA DE COLUMNA==========//
Route::view('/admColumna', 'hcalculo.admdesingcolumna');
Route::post('/columacon', [ColumnaController::class, 'columna'])->name('columacon');
//===================RUTA DE zapata==========//
Route::view('/admZapataCombinada', 'hcalculo.admZapataCombinada');
Route::post('/zapatacombCon', [ZapatacombinadaController::class, 'zapataCombinada'])->name('zapatacombCon');
Route::view('/admZapataConectada', 'hcalculo.admZapataConectada');
Route::post('/zapataconectadaCon', [ZapataconectadaController::class, 'zapataConectada'])->name('zapataconectadaCon');
//=====================RUTAS PARA MUROS DE ALBAÑIERIA=========================//
Route::view('/admMalb', 'hcalculo.admMurosAlbanieria');
Route::post('/malbaCont', [MuroAlbanieriaController::class, 'muroAlbanieria'])->name('malbaCont');
//======================RUTAS PARA LAS IMAGENES===============================//
Route::get('/assets/img/{filename}', function ($filename) {
    $path = public_path('assets/img/' . $filename);
    if (!File::exists($path)) {
        return response()->json(['message' => 'Imagen no encontrada.'], 404);
    }
    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});
//=====================RUTAS PARA LOS PDF=======================================//
Route::get('/assets/pdf/{filename}', function ($filename) {
    $path = public_path('assets/pdf/' . $filename);
    if (!File::exists($path)) {
        return response()->json(['message' => 'PDF no encontrado..'], 404);
    }
    $file = File::get($path);
    $type = File::mimeType($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Our resource routes
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
});

require __DIR__ . '/auth.php';
