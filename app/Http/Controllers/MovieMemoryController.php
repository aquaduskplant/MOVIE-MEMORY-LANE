<?php

namespace App\Http\Controllers;

use App\Models\MovieMemory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MovieMemoryController extends Controller
{
    public function index()
    {
        $memories = MovieMemory::where('user_id', auth()->id())
            ->latest()
            ->get();

        return inertia('Memories/Index', [
            'memories' => $memories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'movie_id' => ['required', 'string'],
            'movie_title' => ['required', 'string', 'max:255'],
            'watched_on' => ['nullable', 'date'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'feeling' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $data['user_id'] = $request->user()->id;

        MovieMemory::updateOrCreate(
            [
                'user_id' => $data['user_id'],
                'movie_id' => $data['movie_id'],
            ],
            $data
        );

        return back()->with('success', 'Your movie memory has been saved.');
    }

    public function update(Request $request, MovieMemory $memory): RedirectResponse
    {
        $this->authorizeMemory($memory, $request);

        $data = $request->validate([
            'watched_on' => ['nullable', 'date'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'feeling' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $memory->update($data);

        return back()->with('success', 'Your movie memory has been updated.');
    }

    public function destroy(Request $request, MovieMemory $memory): RedirectResponse
    {
        $this->authorizeMemory($memory, $request);

        $memory->delete();

        return back()->with('success', 'Memory removed.');
    }

    protected function authorizeMemory(MovieMemory $memory, Request $request): void
    {
        if ($memory->user_id !== $request->user()->id) {
            abort(403);
        }
    }
}
