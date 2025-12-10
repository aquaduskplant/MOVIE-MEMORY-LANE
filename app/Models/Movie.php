<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    // Columns that can be mass assigned
    protected $fillable = [
        'title',
        'description',
        'release_date',
        'rt_score',
        'poster_path',
    ];

    // Make poster_url show up in JSON (for Inertia/React)
    protected $appends = ['poster_url'];

    /**
     * Accessor: build full TMDb poster URL from poster_path.
     */
    public function getPosterUrlAttribute(): ?string
    {
        if (!$this->poster_path) {
            return null;
        }

        // Base URL comes from config/services.php or .env
        $base = config('services.tmdb.image_base', env('TMDB_IMAGE_BASE', 'https://image.tmdb.org/t/p/w500'));

        return $base . $this->poster_path;
    }

    /**
     * Optional: if you have MovieMemory model
     */
    public function memories()
    {
        return $this->hasMany(MovieMemory::class);
    }
}
