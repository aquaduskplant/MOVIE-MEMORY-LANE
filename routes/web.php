<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Movie;

// HOME PAGE
Route::get('/', function () {
    // Get ALL movies from DB
    $movies = Movie::orderBy('release_date')->get();

    // Helper to convert Movie models into plain arrays including poster_path
    $movieToArray = function ($movie) {
        return [
            'id'           => $movie->id,
            'title'        => $movie->title,
            'description'  => $movie->description,
            'release_date' => $movie->release_date,
            'rt_score'     => $movie->rt_score,
            'poster_path'  => $movie->poster_path, // ⬅ IMPORTANT
        ];
    };

    $sections = [
        [
            'slug'        => 'comforting',
            'title'       => 'Comforting Classics',
            'description' => 'Soft, cozy films that feel like a warm blanket on a rainy night.',
            'movies'      => $movies
                ->whereIn('title', [
                    "My Neighbor Totoro",
                    "Kiki's Delivery Service",
                    'Ponyo',
                ])
                ->map($movieToArray)
                ->values(),
        ],
        [
            'slug'        => 'epic',
            'title'       => 'Epic Adventures',
            'description' => 'Sky islands, wild journeys, and unforgettable quests.',
            'movies'      => $movies
                ->whereIn('title', [
                    'Castle in the Sky',
                    'Nausicaä of the Valley of the Wind',
                    'Princess Mononoke',
                    'Spirited Away',
                ])
                ->map($movieToArray)
                ->values(),
        ],
        [
            'slug'        => 'emotional',
            'title'       => 'Heart-Tugging Stories',
            'description' => 'Films that hit deep and stay with you long after the credits.',
            'movies'      => $movies
                ->whereIn('title', [
                    'Grave of the Fireflies',
                    'When Marnie Was There',
                    'The Wind Rises',
                ])
                ->map($movieToArray)
                ->values(),
        ],
    ];

    return Inertia::render('Home', [
        'sections' => $sections,
        'error'    => null,
    ]);
});

// DASHBOARD
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// PROFILE ROUTES
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// AUTH + MOVIES ROUTES
require __DIR__.'/auth.php';
require __DIR__.'/movies.php';
