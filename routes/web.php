<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');

    // Customers - accessible to all authenticated users
    Route::resource('customers', CustomerController::class)
        ->except(['show'])
        ->names([
            'index' => 'customers.index',
            'create' => 'customers.create',
            'store' => 'customers.store',
            'edit' => 'customers.edit',
            'update' => 'customers.update',
            'destroy' => 'customers.destroy',
        ]);

    // Products - accessible to all authenticated users
    Route::resource('products', ProductController::class)
        ->except(['show'])
        ->names([
            'index' => 'products.index',
            'create' => 'products.create',
            'store' => 'products.store',
            'edit' => 'products.edit',
            'update' => 'products.update',
            'destroy' => 'products.destroy',
        ]);

    // Invoices - accessible to all authenticated users
    Route::resource('invoices', InvoiceController::class)
        ->except(['show', 'update'])
        ->names([
            'index' => 'invoices.index',
            'create' => 'invoices.create',
            'store' => 'invoices.store',
            'destroy' => 'invoices.destroy',
        ]);
    Route::get('invoices/{invoice}', [InvoiceController::class, 'show'])
        ->name('invoices.show');

    // Admin-only routes
    Route::middleware('admin')->group(function () {
        // Users management - only for admins
        Route::resource('users', UserController::class)
            ->except(['show'])
            ->names([
                'index' => 'users.index',
                'create' => 'users.create',
                'store' => 'users.store',
                'edit' => 'users.edit',
                'update' => 'users.update',
                'destroy' => 'users.destroy',
            ]);
    });
});

require __DIR__.'/auth.php';