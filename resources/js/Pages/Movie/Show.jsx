import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '../../Layouts/AppLayout';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Show() {
  const { movie, memory, auth } = usePage().props;
  const isLoggedIn = !!auth?.user;

  const { data, setData, post, processing, errors } = useForm({
    movie_id: movie.id,
    movie_title: movie.title,
    watched_on: memory?.watched_on ?? '',
    rating: memory?.rating ?? '',
    feeling: memory?.feeling ?? '',
    notes: memory?.notes ?? '',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('memories.store'), {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1600);
      },
    });
  };

  // Use either movie.image from your DB or TMDB poster_path as fallback
  const posterUrl =
    movie.image ||
    (movie.poster_path ? `${POSTER_BASE}${movie.poster_path}` : null);

  return (
    <AppLayout>
      {/* === BIG SAVE OVERLAY === */}
      <AnimatePresence>
        {saved && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />

            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative px-10 py-8 rounded-[32px] border border-pink-400/40 bg-slate-950/90 shadow-[0_0_80px_rgba(236,72,153,0.9)] flex flex-col items-center gap-3"
            >
              <motion.span
                initial={{ letterSpacing: '0.15em' }}
                animate={{ letterSpacing: '0.35em' }}
                className="text-[11px] uppercase tracking-[0.3em] text-pink-300/80"
              >
                Movie Memory Lane
              </motion.span>

              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 0.6, repeat: 1, repeatType: 'reverse' }}
                className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-[0_0_40px_rgba(236,72,153,0.9)]"
              >
                SAVED
              </motion.h1>

              <p className="text-sm md:text-base text-slate-200/90 text-center max-w-md">
                Your memory has been tucked into your{' '}
                <span className="text-pink-300">My Memories</span> timeline.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === HERO WITH BLURRED POSTER BACKGROUND === */}
      <section className="relative w-full overflow-hidden border-b border-pink-500/10">
        {/* solid black base */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* blurred movie poster ON TOP of black */}
        {posterUrl && (
          <div
            className="absolute inset-0 z-10 bg-cover bg-center blur-lg opacity-100 scale-110"
            style={{ backgroundImage: `url(${posterUrl})` }}
          />
        )}

        {/* CONTENT – poster left, text right */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-center">
          {/* Poster – left side */}
          {posterUrl && (
            <motion.div
              className="w-40 sm:w-48 md:w-60 aspect-[2/3] rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.9)] bg-slate-900/40"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{
                y: -6,
                scale: 1.03,
                rotate: -0.8,
                boxShadow: '0 24px 80px rgba(236,72,153,0.65)',
              }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            >
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Text – right side, arranged like your reference */}
          <div className="flex-1 flex flex-col items-start gap-3 md:gap-4">
            {/* back link */}
            <Link
              href={route('movies.index')}
              className="inline-flex items-center gap-1 text-[11px] md:text-xs text-slate-100/90 hover:text-pink-300 transition"
            >
              <span>←</span>
              Back to Movie Memory Lane
            </Link>

            {/* glowing chip */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-400/40 bg-slate-950/80 px-3 py-1 text-[10px] md:text-[11px] uppercase tracking-[0.23em] text-pink-200 shadow-[0_0_24px_rgba(236,72,153,0.7)]">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
              <span>Studio Ghibli · Featured Film</span>
            </div>

            {/* year + score + title */}
            <div className="space-y-1">
              <p className="text-xs md:text-[11px] uppercase tracking-[0.25em] text-pink-100/90">
                {movie.release_date} • Score {movie.rt_score}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {movie.title}
              </h1>
            </div>

            {/* description line */}
            <p className="text-sm md:text-base text-slate-100/90 max-w-xl">
              Capture when this film crossed your path, how it made you feel,
              and the memory it now holds in your story.
            </p>
          </div>
        </div>
      </section>

      {/* === PAGE CONTENT BELOW HERO === */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <div className="grid md:grid-cols-[3fr,2fr] gap-10 items-start">
          {/* LEFT – MOVIE INFO */}
          <section className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-slate-400">Director</p>
                <p className="font-semibold text-slate-100">
                  {movie.director}
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-slate-400">Producer</p>
                <p className="font-semibold text-slate-100">
                  {movie.producer}
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-slate-400">Running time</p>
                <p className="font-semibold text-slate-100">
                  {movie.running_time} min
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3">
                <p className="text-slate-400">Rotten Tomatoes score</p>
                <p className="font-semibold text-slate-100">
                  {movie.rt_score}
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT – MEMORY FORM */}
          <section className="space-y-4">
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5">
              <h2 className="text-lg font-semibold mb-2">
                Your memory of this film
              </h2>

              {!isLoggedIn && (
                <p className="text-sm text-slate-300">
                  Log in to save how this movie fits into your story.{` `}
                  <Link
                    href={route('login')}
                    className="text-pink-300 hover:text-pink-200"
                  >
                    Log in
                  </Link>{' '}
                  or{' '}
                  <Link
                    href={route('register')}
                    className="text-pink-300 hover:text-pink-200"
                  >
                    create an account
                  </Link>
                  .
                </p>
              )}

              {isLoggedIn && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">
                        When did you watch it?
                      </label>
                      <input
                        type="date"
                        value={data.watched_on}
                        onChange={(e) => setData('watched_on', e.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
                      />
                      {errors.watched_on && (
                        <p className="text-xs text-red-400">
                          {errors.watched_on}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">
                        Rating (1–5)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={data.rating}
                        onChange={(e) => setData('rating', e.target.value)}
                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-2 py-1.5 text-sm text-slate-100"
                      />
                      {errors.rating && (
                        <p className="text-xs text-red-400">
                          {errors.rating}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">
                      How did it make you feel?
                    </label>
                    <input
                      type="text"
                      placeholder="Nostalgic, cozy, inspired..."
                      value={data.feeling}
                      onChange={(e) => setData('feeling', e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100"
                    />
                    {errors.feeling && (
                      <p className="text-xs text-red-400">
                        {errors.feeling}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">
                      Your memory
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Who were you with? What was going on in life? Why does this one stand out?"
                      value={data.notes}
                      onChange={(e) => setData('notes', e.target.value)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-100"
                    />
                    {errors.notes && (
                      <p className="text-xs text-red-400">{errors.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-400 disabled:opacity-60 text-sm font-semibold text-slate-950 transition shadow-[0_0_30px_rgba(236,72,153,0.8)]"
                    >
                      {memory ? 'Update memory' : 'Save memory'}
                    </button>

                    {saved && (
                      <p className="text-xs text-emerald-300">
                        Saved! Check it on your My Memories page.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
