<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MovieMemory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'movie_id',
        'movie_title',
        'watched_on',
        'rating',
        'feeling',
        'notes',
    ];

    protected $casts = [
        'watched_on' => 'date',
        'rating' => 'integer',
    ];

    public function movie()
{
    return $this->belongsTo(Movie::class);
}

}
