import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl">
        <a
          href="/"
          className="text-2xl font-bold tracking-wide text-white hover:text-pink-400 transition"
        >
          MML
        </a>

        <div className="flex items-center gap-4">
          <a
            href={route('login')}
            className="px-4 py-2 rounded-full text-slate-200 border border-slate-700 hover:bg-slate-800 transition"
          >
            Login
          </a>
          <a
            href={route('register')}
            className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-400 text-slate-900 font-semibold shadow-[0_0_20px_rgba(236,72,153,0.5)] transition"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Reset Card */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-[0_0_60px_rgba(236,72,153,0.4)] p-8"
        >
          <h1 className="text-center text-3xl font-bold text-white mb-2">
            Reset Your Password
          </h1>

          <p className="text-center text-slate-400 text-sm mb-6">
            Create a new password to restore your Movie Memory Lane account.
          </p>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-slate-300">Email Address</label>
              <input
                type="email"
                value={data.email}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white"
                disabled
              />
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm text-slate-300">New Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-pink-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm */}
            <div>
              <label className="text-sm text-slate-300">Confirm Password</label>
              <input
                type="password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData('password_confirmation', e.target.value)
                }
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white"
              />
              {errors.password_confirmation && (
                <p className="text-pink-400 text-xs mt-1">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 rounded-full bg-pink-500 hover:bg-pink-400 text-slate-900 font-semibold shadow-[0_0_25px_rgba(236,72,153,0.6)] transition"
            >
              Reset Password
            </button>

            {/* Links */}
            <div className="text-center mt-4">
              <a
                href={route('login')}
                className="text-sm text-slate-400 hover:text-pink-300 transition"
              >
                Back to Login
              </a>
            </div>

            <div className="text-center mt-2">
              <a
                href="/"
                className="text-sm text-slate-400 hover:text-pink-300 transition"
              >
                ← Return to Home
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
