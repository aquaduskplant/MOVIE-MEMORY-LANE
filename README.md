
# Movie Memory Lane – Laravel + React + Inertia Module (Option 2)

This zip contains the **custom code** for your IT110 final project based on:

> Option 2: “My Movie Memory Lane” – Storytelling with Films

It assumes you already have:

- A working **Laravel + Inertia + React + Breeze** project
- Authentication set up (users can register / login)
- Tailwind + Vite configured (default with Breeze)

## 1. Concept

The app tells a cinematic story using data from the **Studio Ghibli public API**:

- API: https://ghibliapi.vercel.app/films

Users can:

- Browse films in a story-like layout
- View details for each movie
- Save their own **Movie Memories** (when they watched it, rating, feelings, notes)
- Edit or delete their memories

## 2. Files Included

You should copy these into your Laravel project:

- `app/Models/MovieMemory.php`
- `app/Http/Controllers/MovieController.php`
- `app/Http/Controllers/MovieMemoryController.php`
- `database/migrations/2025_01_01_000000_create_movie_memories_table.php`
- `routes/movies.php`  → merge this into your existing `routes/web.php`
- `resources/js/Layouts/AppLayout.jsx`
- `resources/js/Pages/Home.jsx`
- `resources/js/Pages/Movie/Show.jsx`
- `resources/js/Pages/Memories/Index.jsx`

## 3. How to Install into Your Laravel Project

1. **Create a new Laravel Breeze + Inertia React project (if not yet):**

   ```bash
   composer create-project laravel/laravel movie-memory-lane
   cd movie-memory-lane

   composer require laravel/breeze --dev
   php artisan breeze:install react
   npm install
   npm run dev
   php artisan migrate
   ```

2. **Copy files:**

   - Copy the `app/`, `database/`, `resources/`, and `routes/movies.php` content from this module into your Laravel project **overwriting** when appropriate or adding new files.

3. **Merge routes:**

   Open `routes/web.php` in your Laravel project and add:

   ```php
   require __DIR__.'/movies.php';
   ```

4. **Run migration:**

   ```bash
   php artisan migrate
   ```

5. **Run the dev servers:**

   ```bash
   php artisan serve
   npm run dev
   ```

6. **Visit:**

   - `http://localhost:8000/` → Home “Movie Memory Lane”
   - Log in / register (via Breeze)
   - Click on a movie to open details
   - Add your Movie Memory and manage it

## 4. Notes

- All CRUD routes are **protected by auth**.
- Public visitors can still see movies on the home page and detail page but cannot create memories.
- The visual design uses Tailwind; you are free to adjust colors, fonts, and animations.
