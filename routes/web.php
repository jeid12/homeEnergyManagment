<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ChatController;

// Public route
Route::get('/', function () {
    return Inertia::render('welcome'); // Make sure Welcome.vue exists in Pages/
})->name('home');

// This route is only to redirect to correct dashboard based on role
Route::middleware(['auth', 'verified', 'role.redirect'])->get('/dashboard', function () {
    return Inertia::render('Redirecting'); // Optional dummy page if needed
})->name('dashboard');

// Admin dashboard route
Route::middleware(['auth', 'verified'])->get('/admin/dashboard', function () {
    return Inertia::render('dashboard'); // Ensure this file exists at resources/js/Pages/Dashboard.vue
})->name('admin.dashboard');

// Client dashboard route
Route::middleware(['auth', 'verified'])->get('/client/dashboard', function () {
    return Inertia::render('userDashboard'); // Ensure this file exists at resources/js/Pages/UserDashboard.vue
})->name('client.dashboard');

Route::middleware(['auth', 'verified',])->group(function () {
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    Route::resource('devices', DeviceController::class);
    Route::resource('sensors', SensorController::class);
   

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
});

// Shared authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

//
// Chat routes                                                                                                      
Route::middleware(['auth'])->group(function () {
    // Route for showing the user chat page
    Route::get('/user-problems', [ChatController::class, 'index'])->name('chat.index');
    
    // Route for storing a new message
    Route::post('/user-problems/store', [ChatController::class, 'store'])->name('chat.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';