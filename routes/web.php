<?php

use App\Http\Controllers\CimientoCorridoController;
use App\Http\Controllers\ColumnaController;
use App\Http\Controllers\DesingLosaController;
use App\Http\Controllers\OctavePlotController;
use App\Http\Controllers\MuroAlbanieriaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZapatacombinadaController;
use App\Http\Controllers\ZapataconectadaController;
use App\Http\Controllers\ZapatageneralController;
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
//==========================RUTA PARA LAS PRUEBAS CAD=======================//
Route::view('/cad', 'matlab.cad');
//==========================RUTA PARA LAS HOJAS DE CALCULO====================//
Route::view('/admDvigas', 'hcalculo.admdesingvigas');
Route::view('/admvigasG', 'hcalculo.admvigageneral');
Route::view('/admExcel', 'hcalculo.admExcel');
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
//-----------------------------------Z general -------------------------------//
Route::view('/admZapataGeneral', 'hcalculo.admdesingZapataGeneral');
Route::post('/zapataGenCon', [ZapatageneralController::class, 'zapataGeneral'])->name('zapataGenCon');
//=====================RUTAS PARA MUROS DE ALBAÑIERIA=========================//
Route::view('/admMalb', 'hcalculo.admMurosAlbanieria');
Route::post('/malbaCont', [MuroAlbanieriaController::class, 'muroAlbanieria'])->name('malbaCont');
//=====================RUTAS PARA PLACAS ===================================//
Route::view('/admplacasL', 'hcalculo.admdesingPlacasL');
//=========================OCTAVE============================================//
Route::view('/admAnalisisEstructuralDeArmaduras', 'matlab.admAnalisisEstructuralDeArmaduras');
Route::post('/zapatas2', [OctavePlotController::class, 'graficarZapatas2'])->name('zapatas2');
Route::view('/admFuerzasCortantesGrafico', 'matlab.admFuerzasCortantesGrafico');
Route::post('/fuerzasCortantes', [OctavePlotController::class, 'graficarFC'])->name('fuerzasCortantes');
Route::view('/admAligeradosGrafico', 'matlab.admAligeradosGrafico');
Route::post('/aligerados', [OctavePlotController::class, 'graficarAligerados'])->name('aligerados');
Route::view('/admZapatasGrafico', 'matlab.admZapatasGrafico');
Route::post('/zapatas', [OctavePlotController::class, 'graficarZapatas'])->name('zapatas');
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
///====================PERMISOS Y ROLES===============================================//
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Our resource routes
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
});

require __DIR__ . '/auth.php';
