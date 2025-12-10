<?php

namespace App\Console\Commands;

use App\Models\Movie;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class SyncMoviePosters extends Command
{
    protected $signature = 'movies:sync-posters';
    protected $description = 'Fetch and store poster paths for movies from TMDb';

    public function handle(): int
    {
        $apiKey = config('services.tmdb.key');

        if (!$apiKey) {
            $this->error('TMDB_API_KEY is not set in .env');
            return self::FAILURE;
        }

        $this->info('Syncing movie posters from TMDb...');

        Movie::chunk(50, function ($movies) use ($apiKey) {
            foreach ($movies as $movie) {
                // Skip if we already have a poster
                if ($movie->poster_path) {
                    $this->line("Skipping {$movie->title} (already has poster)");
                    continue;
                }

                $this->line("Searching poster for: {$movie->title}");

                $response = Http::get('https://api.themoviedb.org/3/search/movie', [
                    'api_key' => $apiKey,
                    'query'   => $movie->title,
                    'year'    => $movie->release_date, // Ghibli API stores year as string
                ]);

                if ($response->failed()) {
                    $this->warn("  TMDb request failed for {$movie->title}");
                    continue;
                }

                $results = $response->json('results');

                if (!$results || !count($results)) {
                    $this->warn("  No TMDb results for {$movie->title}");
                    continue;
                }

                $first = $results[0];

                if (!empty($first['poster_path'])) {
                    $movie->poster_path = $first['poster_path'];
                    $movie->save();

                    $this->info("  Poster saved: {$first['poster_path']}");
                } else {
                    $this->warn("  TMDb result has no poster for {$movie->title}");
                }
            }
        });

        $this->info('Done syncing posters.');
        return self::SUCCESS;
    }
}
