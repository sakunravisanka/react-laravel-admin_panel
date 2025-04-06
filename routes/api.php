<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;

Route::middleware(['auth:sanctum'])->group(function () {
    // Users
    Route::apiResource('users', UserController::class);
    
    // Customers
    Route::apiResource('customers', CustomerController::class);
    
    // Products
    Route::apiResource('products', ProductController::class);
    
    // Invoices
    Route::apiResource('invoices', InvoiceController::class)->except(['update']);
});