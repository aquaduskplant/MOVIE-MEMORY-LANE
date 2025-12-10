import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function AppLayout({ children }) {
  const { auth } = usePage().props;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* --- GLOBAL BACKGROUND VIDEO --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover opacity-[0.45] -z-50"
      >
        <source src="/videos/movie-loop.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 backdrop-blur-[1px] -z-40" />

      {/* --- MASSIVE FUTURISTIC NAVBAR (FIXED) --- */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          fixed top-0 left-0 right-0 z-50
          w-full 
          backdrop-blur-xl
          bg-black/40
          border-b border-white/10
          shadow-[0_0_50px_rgba(236,72,153,0.25)]
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* LEFT — LOGO */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white hover:text-pink-400 transition-all"
          >
            MML
          </Link>

          {/* CENTER — BIG NAV LINKS (no Films) */}
          <div className="hidden md:flex items-center gap-10 text-xl">
            <NavLink href="/">Home</NavLink>
            <NavLink href={route('memories.index')}>My Memories</NavLink>
          </div>

          {/* RIGHT — AUTH AREA */}
          <div className="flex items-center gap-4">
            {auth?.user ? (
              <>
                <span className="hidden md:inline text-lg tracking-tight text-slate-300">
                  Hello, {auth.user.name}
                </span>

                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="
                    px-5 py-2 
                    text-lg font-semibold 
                    rounded-full 
                    bg-pink-500 hover:bg-pink-400 
                    text-black transition 
                    shadow-[0_0_18px_rgba(236,72,153,0.8)]
                  "
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="
                    px-5 py-2 
                    text-lg font-semibold 
                    rounded-full 
                    border border-slate-500
                    hover:border-pink-400 
                    hover:text-pink-300 
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  href={route('register')}
                  className="
                    px-5 py-2 
                    text-lg font-semibold 
                    rounded-full 
                    bg-pink-500 hover:bg-pink-400 
                    text-black transition
                    shadow-[0_0_20px_rgba(236,72,153,0.9)]
                  "
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* --- MAIN CONTENT (PUSHED DOWN SO IT'S NOT UNDER NAV) --- */}
      <main className="pt-28 pb-20">{children}</main>
    </div>
  );
}

/* --- COMPONENT: NAV LINK (big + glowy) --- */
function NavLink({ href, children }) {
  const cleanHref = href.split('#')[0] || '/';
  const currentPath = window.location.pathname || '/';
  const isActive = currentPath === cleanHref;

  return (
    <Link
      href={href}
      className={`
        relative text-lg md:text-xl font-semibold px-2 transition
        ${isActive ? "text-pink-400" : "text-slate-200 hover:text-white"}
      `}
    >
      {children}

      {/* Neon underline when active */}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute left-0 right-0 -bottom-1 h-[3px] bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,1)]"
        />
      )}
    </Link>
  );
}
