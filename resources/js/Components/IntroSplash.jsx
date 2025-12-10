import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = ['M', 'M', 'L'];

export default function IntroSplash({ show, onFinish }) {
  // auto-close after a short time
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2600); // 2.6s total
    return () => clearTimeout(timer);
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="
            fixed inset-0 z-[999]
            flex items-center justify-center
            bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_50%,_#000_100%)]
            overflow-hidden
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* soft glow behind logo */}
          <motion.div
            className="absolute h-72 w-72 rounded-full bg-pink-500/40 blur-[90px]"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.9, scale: 1.1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* main logo / text */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex gap-3">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className="text-6xl md:text-7xl font-bold tracking-[0.2em] text-white"
                  initial={{ y: 40, opacity: 0, blur: 8 }}
                  animate={{ y: 0, opacity: 1, blur: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 * i,
                    ease: 'easeOut',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* tagline */}
            <motion.p
              className="text-xs md:text-sm uppercase tracking-[0.35em] text-pink-200/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Movie Memory Lane · Ghibli Edition
            </motion.p>

            {/* subtle loading bar */}
            <motion.div
              className="mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-slate-700/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-pink-500 via-fuchsia-400 to-indigo-400"
                initial={{ x: '-100%' }}
                animate={{ x: '150%' }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
