import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("login"));
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

            {/* Animated Background Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-indigo-600/10 to-black"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 6 }}
            />

            {/* LOGO & Back to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 text-3xl font-extrabold tracking-wider text-white hover:text-pink-400 transition"
            >
                MML
            </Link>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.45)]"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-pink-300 tracking-tight">
                    Welcome Back
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 text-slate-300">Email</label>
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

                    {/* Password + Forgot link */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm text-slate-300">
                                Password
                            </label>
                            <Link
                                href={route("password.request")}
                                className="text-xs text-pink-300 hover:text-pink-200 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-pink-400 focus:ring-0"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember me (optional) */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.remember === "on"}
                                onChange={(e) =>
                                    setData("remember", e.target.checked ? "on" : "")
                                }
                                className="rounded border-slate-600 bg-slate-900 text-pink-500 focus:ring-pink-400"
                            />
                            <span>Remember me</span>
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-xl text-black font-semibold bg-pink-500 hover:bg-pink-400 transition shadow-[0_0_20px_rgba(236,72,153,0.7)]"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-5">
                    New here?{" "}
                    <Link href={route("register")} className="text-pink-400 hover:underline">
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
