<?php



namespace App\Console\Commands;

use App\Models\Movie;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportGhibliMovies extends Command
{
    protected $signature = 'movies:import-ghibli';
    protected $description = 'Fetch Studio Ghibli movies from the public API and store them locally';

    public function handle(): int
    {
        $this->info('Fetching Studio Ghibli films...');

        $response = Http::get('https://ghibliapi.vercel.app/films');

        if ($response->failed()) {
            $this->error('Failed to fetch films from Ghibli API.');
            return self::FAILURE;
        }

        $films = $response->json();

        foreach ($films as $film) {
            Movie::updateOrCreate(
                ['title' => $film['title']],
                [
                    'description'  => $film['description'] ?? null,
                    'release_date' => $film['release_date'] ?? null,
                    'rt_score'     => $film['rt_score'] ?? null,
                ]
            );

            $this->line("Saved: {$film['title']}");
        }

        $this->info('All Ghibli films imported.');
        return self::SUCCESS;
    }
}

