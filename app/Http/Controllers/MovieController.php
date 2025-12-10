<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\MovieMemory;

class MovieController extends Controller
{
    protected string $apiBase = 'https://ghibliapi.vercel.app';

    public function index()
    {
        // Fetch all films from Studio Ghibli API
        $response = Http::get($this->apiBase . '/films');

        if ($response->failed()) {
            return Inertia::render('Home', [
                'movies' => [],
                'sections' => [],
                'error' => 'Failed to load movies from external API.',
            ]);
        }

        $movies = $response->json();

        // Build some simple "story" sections
        $comforting = [];
        $epic = [];
        $emotional = [];

        foreach ($movies as $movie) {
            $score = (int) ($movie['rt_score'] ?? 0);
            if ($score >= 95) {
                $epic[] = $movie;
            } elseif ($score >= 85) {
                $emotional[] = $movie;
            } else {
                $comforting[] = $movie;
            }
        }

        $sections = [
            [
                'slug' => 'comforting',
                'title' => 'Comforting Classics',
                'description' => 'Soft, cozy films that feel like a warm blanket on a rainy day.',
                'movies' => array_slice($comforting, 0, 6),
            ],
            [
                'slug' => 'epic',
                'title' => 'Epic Adventures',
                'description' => 'Big worlds, bold journeys, and unforgettable heroes.',
                'movies' => array_slice($epic, 0, 6),
            ],
            [
                'slug' => 'emotional',
                'title' => 'Heart-Tugging Stories',
                'description' => 'Emotional, reflective films that stay with you long after the credits.',
                'movies' => array_slice($emotional, 0, 6),
            ],
        ];

        return Inertia::render('Home', [
            'sections' => $sections,
            'error' => null,
        ]);
    }

    public function show(string $id)
    {
        $response = Http::get($this->apiBase . '/films/' . $id);

        if ($response->failed()) {
            abort(404);
        }

        $movie = $response->json();
        $memory = null;

        if (auth()->check()) {
            $memory = MovieMemory::where('user_id', auth()->id())
                ->where('movie_id', $movie['id'])
                ->first();
        }

        return Inertia::render('Movie/Show', [
            'movie' => $movie,
            'memory' => $memory,
        ]);
    }
}
