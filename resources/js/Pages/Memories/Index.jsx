import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '../../Layouts/AppLayout';

export default function MemoriesIndex() {
  const { memories = [], auth } = usePage().props;

  const [memoryToDelete, setMemoryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openDeleteModal = (memory) => {
    setMemoryToDelete(memory);
  };

  const closeDeleteModal = () => {
    if (!deleting) setMemoryToDelete(null);
  };

  const confirmDelete = () => {
    if (!memoryToDelete) return;
    setDeleting(true);

    router.delete(route('memories.destroy', memoryToDelete.id), {
      preserveScroll: true,
      onFinish: () => {
        setDeleting(false);
        setMemoryToDelete(null);
      },
    });
  };

  return (
    <AppLayout>
      {/* === DELETE CONFIRM MODAL === */}
      <AnimatePresence>
        {memoryToDelete && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeDeleteModal}
            />

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-md w-full mx-4 rounded-3xl border border-pink-500/40 bg-slate-950/95 shadow-[0_0_60px_rgba(236,72,153,0.8)] p-6 space-y-4"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80">
                Movie Memory Lane
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Remove this memory?
              </h2>

              <p className="text-sm text-slate-300">
                This will remove your saved notes for{' '}
                <span className="font-semibold text-pink-200">
                  {memoryToDelete.movie_title}
                </span>
                . You can always create a new memory later.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-200 hover:bg-slate-900/70 transition disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-400 text-sm font-semibold text-slate-950 transition shadow-[0_0_30px_rgba(236,72,153,0.9)] disabled:opacity-60"
                >
                  {deleting ? 'Removing…' : 'Delete memory'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PAGE CONTENT === */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80">
              Your personal cinema log
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mt-1">
              My Movie Memories
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Every film here is more than just a title — it&apos;s a snapshot of
              when, where, and how it met you in real life.
            </p>
          </div>

          <Link
            href={route('movies.index')}
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-100 hover:bg-slate-900/70 transition"
          >
            ← Back to Movie Memory Lane
          </Link>
        </div>

        {memories.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-center text-sm text-slate-300">
            No memories yet. Browse a film and save your first story.
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-pink-300/80">
                    {memory.watched_on
                      ? `Watched · ${memory.watched_on}`
                      : 'Memory saved'}
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    {memory.movie_title}
                  </h2>
                  {memory.feeling && (
                    <p className="text-sm text-slate-300">
                      Feeling:{' '}
                      <span className="text-pink-200">{memory.feeling}</span>
                    </p>
                  )}
                  {memory.notes && (
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {memory.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <Link
                    href={route('movies.show', memory.movie_id)}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs md:text-sm text-slate-100 border border-slate-700 transition"
                  >
                    View movie
                  </Link>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(memory)}
                    className="px-4 py-2 rounded-full bg-transparent border border-red-500/70 text-xs md:text-sm text-red-300 hover:bg-red-500/10 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
