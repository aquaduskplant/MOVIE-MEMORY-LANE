<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieMemoryController;
use Illuminate\Support\Facades\Route;

// Public movie story pages
Route::get('/', [MovieController::class, 'index'])->name('movies.index');
Route::get('/movies/{id}', [MovieController::class, 'show'])->name('movies.show');

// Authenticated CRUD for movie memories
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/memories', [MovieMemoryController::class, 'index'])->name('memories.index');
    Route::post('/memories', [MovieMemoryController::class, 'store'])->name('memories.store');
    Route::put('/memories/{memory}', [MovieMemoryController::class, 'update'])->name('memories.update');
    Route::delete('/memories/{memory}', [MovieMemoryController::class, 'destroy'])->name('memories.destroy');
});
