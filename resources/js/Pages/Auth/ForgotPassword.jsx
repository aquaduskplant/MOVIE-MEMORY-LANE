import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("password.email"));
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-indigo-600/10 to-black"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Logo / back to home */}
            <Link
                href="/"
                className="absolute top-6 left-6 text-3xl font-extrabold tracking-wider text-white hover:text-pink-400 transition"
            >
                MML
            </Link>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.45)]"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center text-pink-300 tracking-tight">
                    Forgot your password?
                </h2>

                <p className="text-sm text-slate-300 text-center mb-6">
                    No worries. Enter the email you used for your{" "}
                    <span className="text-pink-300 font-medium">Movie Memory Lane</span>{" "}
                    account and a reset link will be sent to you.
                </p>

                {/* Status message if email was sent */}
                {status && (
                    <div className="mb-4 text-sm text-emerald-300 bg-emerald-900/40 border border-emerald-500/40 rounded-xl px-4 py-2">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 text-slate-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-pink-400 focus:ring-0"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-xl text-black font-semibold bg-pink-500 hover:bg-pink-400 transition shadow-[0_0_20px_rgba(236,72,153,0.7)]"
                    >
                        Send reset link
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-5">
                    Remembered it?{" "}
                    <Link href={route("login")} className="text-pink-300 hover:underline">
                        Back to login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
