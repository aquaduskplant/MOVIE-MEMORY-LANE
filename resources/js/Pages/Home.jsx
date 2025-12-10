import React, { useRef, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppLayout from '../Layouts/AppLayout';
import ScrollFloat from '@/Components/ScrollFloatText';
import FloatingLines from '@/Components/FloatingLines';
import TrueFocus from '@/Components/TrueFocus';
import FlowingMenu from '@/Components/FlowingMenu';
import IntroSplash from '@/Components/IntroSplash';

const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Home() {
  const { sections = [], error } = usePage().props;

  // Intro always shows on each refresh
  const [showIntro, setShowIntro] = useState(true);

  // Scroll-to-top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // MOBILE hamburger menu state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Show/hide scroll-to-top button based on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(y > 400); // show after 400px scroll
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-to-top handler
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Parallax for hero
  const heroTitleY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const heroCardY = useTransform(scrollYProgress, [0, 0.4], [0, 40]);
  const heroCardScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96]);

  const chapters = sections.map((section, index) => ({
    ...section,
    chapterNumber: index + 1,
  }));

  // Build FlowingMenu items from sections, using a movie poster as background
  const sectionMenuItems = chapters.map((chapter) => {
    const firstMovieWithImage =
      chapter.movies?.find((m) => m.image) || chapter.movies?.[0];

    let bgImage = firstMovieWithImage?.image || '';

    // If your API uses poster_path instead of full URL, you can uncomment:
    // if (!bgImage && firstMovieWithImage?.poster_path) {
    //   bgImage = `${POSTER_BASE}${firstMovieWithImage.poster_path}`;
    // }

    return {
      link: `#${chapter.slug}`,
      text: chapter.title.toUpperCase(),
      image: bgImage,
    };
  });

  return (
    <>
      {/* Fullscreen MML intro on every refresh */}
      <IntroSplash show={showIntro} onFinish={() => setShowIntro(false)} />

      <AppLayout>
        {/* MAIN CONTENT WRAPPER */}
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto px-4 py-10 space-y-16"
        >
          {/* FUTURISTIC PARALLAX HERO */}
          <motion.section
            className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Background glow behind text */}
            <motion.div
              className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 bg-pink-500/40 blur-[120px] rounded-full"
              animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.15, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Left side – BIG TITLE */}
            <motion.div
              style={{ y: heroTitleY }}
              className="z-10 max-w-xl space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-slate-950/80 px-3 py-1 text-[11px] text-pink-200 shadow-[0_0_18px_rgba(236,72,153,0.7)]">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>Movie Memory Lane · Ghibli Edition</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                Your Movie Memories,
                <br />
                <span className="text-pink-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-md">
                A sleek cinematic interface to browse Studio Ghibli films and log
                the moments they created in your life.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={chapters[0] ? `#${chapters[0].slug}` : '#'}
                  className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-lg font-semibold text-slate-950 transition shadow-[0_0_25px_rgba(236,72,153,0.8)]"
                >
                  Start Now
                </Link>

                <Link
                  href={route('memories.index')}
                  className="px-6 py-3 rounded-full border border-slate-700 hover:bg-slate-900/60 text-lg text-slate-200 transition"
                >
                  View Your Memories
                </Link>
              </div>
            </motion.div>

            {/* Right side – floating futuristic card */}
            <motion.div
              style={{ y: heroCardY, scale: heroCardScale }}
              className="relative w-full max-w-sm"
            >
              <motion.div
                className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 bg-indigo-500/40 blur-[120px] rounded-full"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1.1, 0.9, 1.1] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_60px_rgba(15,23,42,0.9)]">
                <div className="p-6 space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-pink-300/80">
                    Featured film
                  </p>

                  <h3 className="text-2xl font-semibold text-white">
                    Spirited Away
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    A landmark Studio Ghibli classic. Use Movie Memory Lane to
                    record when you watched it, how it hit, and the moment it
                    connected with your own story.
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span>Release: 2001</span>
                    <span>Score: 97 / 100</span>
                  </div>

                  <Link
                    href={route('movies.index')}
                    className="inline-flex items-center mt-4 px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-400 text-slate-950 font-medium text-sm transition"
                  >
                    Browse all films →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* OVERVIEW STRIP */}
          <motion.section
            className="flex flex-col gap-16 items-center justify-between"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="italic">MADE BY:</div>
            <div>
              <TrueFocus
                sentence="Laravel Inertia React TailwindCSS TMDBAPI FramerMotion ReactBits"
                manualMode={true}
                blurAmount={10}
                borderColor="#EB4798"
                animationDuration={0.5}
                pauseBetweenAnimations={0.5}
              />
            </div>
          </motion.section>

          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 text-red-100 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* MINI CHAPTER NAV – FlowingMenu design */}
          {chapters.length > 0 && (
            <motion.section
              className="rounded-3xl border border-slate-800 bg-slate-950/85 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Sections
                </p>
                <p className="text-xs text-slate-300">
                  Hover and click a row to jump to that chapter.
                </p>
              </div>

              <div className="h-[260px] md:h-[320px]">
                <FlowingMenu items={sectionMenuItems} />
              </div>
            </motion.section>
          )}

          {/* FLOATING LINES + MEMORIES? */}
          <section className="relative w-screen py-30 md:py-30 left-1/2 -translate-x-1/2">
            <div className="relative h-[1000px] w-screen overflow-hidden">
              {/* Dimmed React Bits background */}
              <div className="absolute inset-0 z-0 opacity-30">
                <FloatingLines
                  enabledWaves={['top', 'middle', 'bottom']}
                  lineCount={[10, 15, 20]}
                  lineDistance={[8, 6, 4]}
                  bendRadius={5.0}
                  bendStrength={-0.5}
                  interactive={true}
                  parallax={true}
                />
              </div>

              {/* Text overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
                  containerClassName="my-0"
                  textClassName="text-4xl md:text-6xl lg:text-7xl tracking-[0.6em] uppercase text-slate-100"
                >
                  MEMORIES?
                </ScrollFloat>
              </div>
            </div>
          </section>

          {/* CHAPTERS / SECTIONS */}
          {chapters.map((section, index) => (
            <motion.section
              key={section.slug}
              id={section.slug}
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            >
              <div className="grid md:grid-cols-[1.2fr,3fr] gap-6 md:gap-10 items-start">
                {/* Left panel – section info */}
                <div className="relative">
                  <div className="hidden md:block absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-slate-700 to-transparent" />
                  <div className="flex md:block items-center gap-3">
                    <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full bg-slate-950 border border-pink-500/70 text-xs font-semibold text-pink-200 shadow-[0_0_22px_rgba(236,72,153,0.9)]">
                      {String(section.chapterNumber).padStart(2, '0')}
                    </div>
                    <div className="mt-4 md:mt-6 space-y-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-pink-300/80">
                        Section {section.chapterNumber}
                      </p>
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                        {section.title}
                      </h2>
                      <p className="text-slate-300 text-sm">
                        {section.description}
                      </p>
                      <p className="text-slate-400 text-xs">
                        Browse this selection and open a film to attach your own
                        memory entry to it.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right panel – films grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.movies?.map((movie, idx) => (
                    <React.Fragment key={movie.id}>
                      {idx === 0 &&
                        console.log('Sample movie from backend:', movie)}

                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.06,
                          ease: 'easeOut',
                        }}
                        whileHover={{
                          y: -6,
                          scale: 1.03,
                          rotate: -0.4,
                          boxShadow: '0 18px 40px rgba(15,23,42,0.95)',
                        }}
                      >
                        <Link
                          href={route('movies.show', movie.id)}
                          className="group rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden transition-colors hover:border-pink-400/80 backdrop-blur-md"
                        >
                          <div className="w-full">
  {/* MOBILE: show full image, no crop */}
  <div className="aspect-video overflow-hidden bg-slate-950 flex items-center justify-center md:hidden">
    {movie.image ? (
      <img
        src={movie.image}
        alt={movie.title}
        loading="lazy"
        className="max-w-full max-h-full object-contain group-hover:scale-[1.03] group-hover:rotate-[0.4deg] transition-transform duration-300"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-100 text-sm p-4">
        {movie.title}
      </div>
    )}
  </div>

  {/* DESKTOP / TABLET: keep original big poster look */}
  <div className="hidden md:block">
    <div className="aspect-[3/4] overflow-hidden rounded-xl">
      {movie.image ? (
        <img
          src={movie.image}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.05] group-hover:rotate-[0.4deg] transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-100 text-sm p-4">
          {movie.title}
        </div>
      )}
    </div>
  </div>
</div>





                          <div className="p-4 space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-pink-300/70">
                              {movie.release_date} · Score {movie.rt_score}
                            </p>
                            <p className="font-semibold text-sm group-hover:text-pink-200">
                              {movie.title}
                            </p>
                            <p className="text-xs text-slate-400 line-clamp-3">
                              {movie.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* MOBILE-ONLY HAMBURGER + MENU (Home / Memories) */}
        {!showIntro && (
          <>
            {/* Button – only visible on mobile */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="fixed right-4 top-20 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/90 border border-slate-700 text-slate-100 shadow-lg md:hidden"
              aria-label="Open navigation"
            >
              {/* Simple three-line hamburger icon */}
              <span className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-5 bg-current rounded-full" />
                <span className="block h-[2px] w-5 bg-current rounded-full" />
                <span className="block h-[2px] w-5 bg-current rounded-full" />
              </span>
            </button>

            {/* Slide-down panel, also mobile-only */}
            {isMobileNavOpen && (
              <div className="fixed right-4 top-32 z-40 w-44 rounded-2xl border border-slate-700 bg-slate-950/95 shadow-2xl md:hidden">
                <div className="flex flex-col py-2 text-sm">
                  <Link
                    href="/"
                    className="px-4 py-2 text-slate-100 hover:bg-slate-800 hover:text-pink-300 transition"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href={route('memories.index')}
                    className="px-4 py-2 text-slate-100 hover:bg-slate-800 hover:text-pink-300 transition"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Your Memories
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* SCROLL-TO-TOP BUTTON (bottom-right) */}
        {!showIntro && showScrollTop && (
          <motion.button
            type="button"
            onClick={handleScrollTop}
            className="fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-slate-950 shadow-lg border border-pink-300/70 hover:bg-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.9)] transition-colors"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            aria-label="Back to top"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AppLayout>
    </>
  );
}
