<?php

use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\CriteriaController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ApplyController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia; // We are going to use this class to render React components

Route::group(['middleware' => ['auth']], function () {
    Route::controller(OfferController::class)->group( function () {
        Route::get('offers/telecharger/{id}', 'generate');
        Route::put('offers/rejected/{id}', 'rejected');
        Route::get('offers/approval/{id}', 'approval');
        Route::get('offers/confirm/{id}', 'actives');
        Route::get('offers/applies/{id}', 'applies');
        Route::get('offers/delete/{id}', 'destroy');
        Route::put('offers/update/{id}', 'update');
        Route::get('offers/edit/{id}', 'edit');
        Route::get('offers/show/{id}', 'show');
        Route::get('offers/create', 'create');
        Route::post('offers/store', 'store');
        Route::get('offers', 'index');
    });

    Route::controller(EstablishmentController::class)->group( function () {
        Route::put('establishments/rejected/{id}', 'rejected');
        Route::get('establishments/approval/{id}', 'approval');
        Route::get('establishments/actives/{id}', 'actives');
        Route::get('establishments/destroy/{id}', 'destroy');
        Route::put('establishments/update/{id}', 'update');
        Route::get('establishments/edit/{id}', 'edit');
        Route::get('establishments/show/{id}', 'show');
        Route::get('establishments/create', 'create');
        Route::post('establishments/store', 'store');
        Route::get('establishments', 'index');
    });

    Route::controller(InstitutionController::class)->group( function () {
        Route::put('institutions/rejected/{id}', 'rejected');
        Route::get('institutions/approval/{id}', 'approval');
        Route::get('institutions/actives/{id}', 'actives');
        Route::get('institutions/destroy/{id}', 'destroy');
        Route::put('institutions/update/{id}', 'update');
        Route::get('institutions/edit/{id}', 'edit');
        Route::get('institutions/show/{id}', 'show');
        Route::get('institutions/create', 'create');
        Route::post('institutions/store', 'store');
        Route::get('institutions', 'index');
    });

    Route::controller(CountryController::class)->group( function () {
        Route::get('countries/actives/{id}', 'actives');
        Route::get('countries/destroy/{id}', 'destroy');
        Route::put('countries/update/{id}', 'update');
        Route::get('countries/edit/{id}', 'edit');
        Route::get('countries/create', 'create');
        Route::post('countries/store', 'store');
        Route::get('countries', 'index');
    });

    Route::controller(CriteriaController::class)->group( function () {
        Route::get('criterias/actives/{id}', 'actives');
        Route::get('criterias/destroy/{id}', 'destroy');
        Route::put('criterias/update/{id}', 'update');
        Route::get('criterias/edit/{id}', 'edit');
        Route::get('criterias/create', 'create');
        Route::post('criterias/store', 'store');
        Route::get('criterias', 'index');
    });

    Route::controller(CityController::class)->group( function () {
        Route::get('cities/actives/{id}', 'actives');
        Route::get('cities/destroy/{id}', 'destroy');
        Route::put('cities/update/{id}', 'update');
        Route::get('cities/edit/{id}', 'edit');
        Route::get('cities/create', 'create');
        Route::post('cities/store', 'store');
        Route::get('cities', 'index');
    });

    Route::controller(UserController::class)->group( function () {
        Route::put('users/update/role/{id}', 'role');
        Route::get('users/actives/{id}', 'actives');
        Route::get('users/destroy/{id}', 'destroy');
        Route::get('users/create', 'create');
        Route::post('users/store', 'store');
        Route::get('profile', 'profile');
        Route::get('users', 'index');
    });

    Route::controller(ApplyController::class)->group( function () {
        Route::get('applies/approval/{id}', 'approval');
        Route::put('applies/rejected/{id}', 'rejected');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('core/dashboard',
        ['user' => Auth::user()]);
    });

    Route::get('/profile', function () {
        return Inertia::render('core/user/profile',
        ['user' => Auth::user()]);
    });


});

Route::controller(AuthController::class)->group( function () {
    Route::get('account/verify/{token}', 'verify')->name('verify');
    Route::post('inscription', 'inscription');
    Route::post('connexion', 'connexion');
    Route::get('register', 'register');
    Route::get('logout', 'logout');
});

Route::get('/', function () {
    return Inertia::render('login'); 
})->name('login');

Route::get('/offres', function () {
    return view('offres'); 
})->name('offres');