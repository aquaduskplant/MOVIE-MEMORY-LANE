Movie Memory Lane – Setup Instructions
======================================

This project is a Laravel + Inertia + React app called “Movie Memory Lane (MML)”
with a Ghibli-themed movie browser and personal memory tracker.

Use this file as a quick start guide for setting up the project on a new machine.


1. Tech Stack
-------------

- Backend: Laravel (PHP)
- Frontend: Inertia + React
- Styling: Tailwind CSS
- Animations: Framer Motion, GSAP, custom React Bits components
- Database: PostgreSQL
- External API: TMDB (The Movie Database) for images/posters


2. Prerequisites
----------------

Make sure you have these installed:

- PHP 8.1+ (with typical Laravel extensions)
- Composer
- Node.js 18+ and npm
- Git
- PostgreSQL 13+ (or compatible version; with a user and database created)

To verify:

- `php -v`
- `composer -V`
- `node -v`
- `npm -v`
- `psql --version`


3. Clone the Repository
-----------------------

1. Choose or create a folder where you keep your projects.
2. Clone the repo:

   - `git clone <REPO_URL> MovieMemoryLane`
   - `cd MovieMemoryLane`


4. Install PHP Dependencies
---------------------------

Run:

- `composer install`

This installs all Laravel backend dependencies.


5. Install Frontend Dependencies
--------------------------------

Run:

- `npm install`

This installs React, Inertia, Tailwind, Framer Motion, GSAP, and other JS packages
defined in `package.json`.


6. Environment Configuration
----------------------------

1. Copy the example environment file:

   - `cp .env.example .env`   (Windows: `copy .env.example .env`)

2. Open `.env` in a text editor and verify/update the following:

   - `APP_NAME="MML"`
   - `APP_URL=http://127.0.0.1:8000`

3. Database (PostgreSQL):

   - First, create a database and user in Postgres, for example:

     - `createdb mml_db`
     - `createuser mml_user`  (or use an existing user)
     - Give that user access to the database and a password:

       - in `psql`:
         - `ALTER USER mml_user WITH PASSWORD 'your_password_here';`
         - `GRANT ALL PRIVILEGES ON DATABASE mml_db TO mml_user;`

   - In `.env`, set:

     - `DB_CONNECTION=pgsql`
     - `DB_HOST=127.0.0.1`
     - `DB_PORT=5432`
     - `DB_DATABASE=mml_db`
     - `DB_USERNAME=mml_user`
     - `DB_PASSWORD=your_password_here`

4. TMDB API key (for movie posters/images):

   - Sign up at https://www.themoviedb.org/ and create an API key.
   - In `.env`, set:

     - `TMDB_API_KEY=your_tmdb_api_key_here`
     - `TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500`


7. Generate Application Key
---------------------------

Run:

- `php artisan key:generate`

This sets `APP_KEY` in `.env` (required for encryption and sessions).


8. Run Migrations and Seeders
-----------------------------

Run:

- `php artisan migrate --seed`

This will:

- Create all database tables in your PostgreSQL database.
- Seed base data (sections/chapters, Ghibli movies, and any default users configured).


9. Start the Development Servers
--------------------------------

You need **two** processes running:

1. Laravel backend:

   - `php artisan serve`
   - This serves the app at: `http://127.0.0.1:8000`

2. Vite dev server (frontend):

   - In a **separate terminal**:

     - `npm run dev`

   - Keep this running so React/Tailwind changes update automatically.


10. Login / Access
------------------

- Visit: `http://127.0.0.1:8000`
- Use the Laravel authentication pages (Login/Register) or any seeded user credentials
  defined in your `database/seeders` directory.


11. Project Structure Notes
---------------------------

Key paths:

- Backend (Laravel):
  - `app/`, `routes/web.php`, `database/migrations/`, `database/seeders/`

- Inertia + React pages:
  - `resources/js/Pages/`
    - `Home.jsx` – main landing page (hero, sections, poster grid)
    - `Memories/` – user memory views

- Shared layouts & components:
  - `resources/js/Layouts/AppLayout.jsx` – main layout (top bar, logout, etc.)
  - `resources/js/Components/ScrollFloatText.jsx`
  - `resources/js/Components/FloatingLines.jsx`
  - `resources/js/Components/TrueFocus.jsx`
  - `resources/js/Components/FlowingMenu.jsx`
  - `resources/js/Components/IntroSplash.jsx`

- Styling:
  - `tailwind.config.js`
  - `resources/css/` (or `resources/js/app.jsx` imports Tailwind)

If you change Tailwind config or add new components/classes, restart `npm run dev`
if styles don’t update.


12. Building for Production
---------------------------

When you’re ready for a production build:

1. Compile assets:

   - `npm run build`

2. Make sure `.env` uses:

   - `APP_ENV=production`
   - `APP_DEBUG=false`

3. Confirm PostgreSQL credentials and database are correctly configured on
   your production server.

4. Serve the app using your chosen production stack
   (e.g., Laravel Forge, Nginx + PHP-FPM, Apache, etc.).


13. Common Troubleshooting
--------------------------

- **White screen / blank page**
  - Make sure `npm run dev` (or `npm run build`) has been run.
  - Check your browser dev tools for JS errors.
  - Ensure Vite is not blocked by ad blockers or HTTPS misconfig.

- **“relation does not exist” / migration errors (Postgres)**
  - Confirm `.env` is pointing at the correct Postgres DB.
  - Re-run:
    - `php artisan migrate:fresh --seed`

- **TMDB posters not loading**
  - Check `TMDB_API_KEY` and `TMDB_IMAGE_BASE` in `.env`.
  - Clear config cache:
    - `php artisan config:clear`

- **Tailwind classes not working**
  - Ensure `npm run dev` is running.
  - Confirm `content` paths in `tailwind.config.js` include:
    - `./resources/views/**/*.blade.php`
    - `./resources/js/**/*.jsx`


14. Quick Start Summary (PostgreSQL)
------------------------------------

If everything is installed, the short version:

1. `git clone <REPO_URL> MovieMemoryLane`
2. `cd MovieMemoryLane`
3. `composer install`
4. `npm install`
5. `cp .env.example .env`
6. Edit `.env` → Postgres DB (DB_CONNECTION=pgsql), TMDB keys, `APP_URL`, etc.
7. `php artisan key:generate`
8. Create Postgres DB and user (`mml_db`, `mml_user`) and update `.env`
9. `php artisan migrate --seed`
10. `npm run dev`
11. `php artisan serve`
12. Open `http://127.0.0.1:8000` in your browser.







15. Challenges & Learnings
--------------------------

This project was also a learning lab. Here are the main challenges encountered
during development and how they were addressed.

15.1 Migrating from SQLite to PostgreSQL
----------------------------------------

**Challenge**

- The first version of the app used SQLite because it was quick to set up.
- As the project grew (more tables, relationships, and potential deployment),
  SQLite started to feel limiting.
- Switching to PostgreSQL introduced differences in:
  - SQL syntax (especially JSON, enums, and date types).
  - Connection configuration and environment variables.
  - Migrations and seeding behavior.

**What Broke / Pain Points**

- Some migrations that worked on SQLite failed on PostgreSQL
  (e.g., type mismatches, default values, or unsupported column modifiers).
- Seeders sometimes assumed SQLite behavior when inserting or resetting data.
- Local `.env` configuration still pointed to the old SQLite connection.

**Solution**

1. **Standardize on PostgreSQL in `.env`**  
   - Updated:
     - `DB_CONNECTION=pgsql`
     - `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
   - Removed or ignored old SQLite config.

2. **Review and adjust migrations**
   - Checked each migration file and verified column types that map well to
     PostgreSQL (e.g., `bigInteger`, `timestamps`, `text`).
   - Avoided SQLite-specific tricks (like some `boolean`/`tinyInteger`
     shortcuts).
   - When in doubt, ran:
     - `php artisan migrate:fresh --seed`
     - and fixed any error messages directly.

3. **Clean resets while iterating**
   - Used:
     - `php artisan migrate:fresh --seed`
   - to completely rebuild the Postgres schema whenever a migration changed.

4. **Verified seeding**
   - Confirmed that sections, movies, and users were actually present in the
     PostgreSQL database using `psql` or a GUI (PgAdmin, TablePlus, etc.).

**Result**

- The project now runs fully on PostgreSQL, making it closer to a real
  production setup, with better support for scaling and more advanced querying.


15.2 Learning New Languages and Tools
-------------------------------------

**Challenge**

- This project pulled together several technologies that were new or partially
  new to the team:
  - Laravel (PHP) backend patterns (migrations, seeders, controllers).
  - Inertia + React for the frontend.
  - Tailwind CSS utility-first styling.
  - Framer Motion and GSAP for animations.
  - PostgreSQL for relational data.

**What Was Hard**

- Understanding how Inertia glues Laravel routes to React pages.
- Remembering Tailwind utility classes instead of writing regular CSS.
- Managing state and hooks in React (`useState`, `useEffect`, `useRef`).
- Debugging database issues across Laravel and Postgres.

**Solution**

1. **Start with one feature at a time**
   - Focused first on basic CRUD and data display (sections + movies) *without*
     animations.
   - Only added visual polish and motion after the core flow worked.

2. **Use official docs and small test files**
   - Created tiny “test” components or routes just to try out:
     - A new Tailwind layout.
     - A new React hook.
     - A small Framer Motion animation.
   - Once understood, moved the pattern into the real app.

3. **Console and logging everywhere**
   - `console.log()` in React for checking props and movie data.
   - Laravel logs / `dd()` for debugging backend queries and seeders.

4. **Keep code structured**
   - Grouped frontend code under:
     - `resources/js/Pages/` (screens)
     - `resources/js/Components/` (reusable UI pieces)
     - `resources/js/Layouts/` (overall shells)
   - Kept backend logic under:
     - Controllers, migrations, seeders.

**Result**

- The team gained hands-on experience in a full Laravel + React stack:
  routing, state, styling, and animations all working together in one project.


15.3 Exploring and Implementing Animations
------------------------------------------

**Challenge**

- The project uses advanced animations to create a “cinematic” experience:
  - Intro splash screen (MML logo / text animation).
  - Parallax hero (“Your Movie Memories, Reimagined.”).
  - React Bits components (ScrollFloat, FloatingLines, TrueFocus, FlowingMenu).
  - Hover effects on movie cards.

- Problems faced:
  - Some animations caused layout glitches.
  - Background animations interfered with hover interactions.
  - Performance concerns on mobile.

**Solution**

1. **Layering and z-index**
   - All animated backgrounds (like `FloatingLines`) are placed in a **lower**
     z-index layer with reduced opacity.
   - Foreground text and buttons are given higher `z-10` or higher
     to stay crisp and clickable.

2. **Use motion only where it helps UX**
   - Key animations:
     - Intro splash on page load.
     - Subtle parallax on the hero title/card.
     - Hover lift and slight rotation on movie cards.
     - FlowingMenu for chapter navigation.
   - Avoided animating everything at once to prevent chaos and lag.

3. **Combine CSS + Framer Motion + GSAP carefully**
   - Framer Motion handles component entrance, scrolling, and parallax.
   - GSAP powers the FlowingMenu hover marquee.
   - Tailwind handles the base layout and transitions (like `transition-colors`,
     `hover:scale-105`).

4. **Respect performance**
   - Turned down some motion details on mobile (e.g., fewer heavy blurs).
   - Used `loading="lazy"` for movie posters to avoid loading everything at once.

**Result**

- The UI feels alive and cinematic without being unusable or too heavy.
- Animations now support the storytelling aspect of “Memory Lane”
  instead of distracting from it.


15.4 Future Improvements
------------------------

- Add unit tests and feature tests for key flows (creating memories, filtering
  movies, etc.).
- Implement pagination or infinite scrolling for very large movie lists.
- Add user preferences for:
  - Reduced animations mode.
  - Light/dark theme toggle.
- Explore using PostgreSQL-specific features (JSONB, full-text search) for
  more advanced memory search in the future.









End of README
