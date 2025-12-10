import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("register"));
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

            {/* Animated Background Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-pink-500/10 to-black"
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

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.45)]"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-pink-300 tracking-tight">
                    Create Your Account
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1 text-slate-300">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-pink-400 focus:ring-0"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

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
                            <p className="text-red-400 text-sm">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1 text-slate-300">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-pink-400 focus:ring-0"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-1 text-slate-300">Confirm</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-pink-400 focus:ring-0"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        disabled={processing}
                        className="w-full py-3 rounded-xl text-black font-semibold bg-pink-500 hover:bg-pink-400 transition shadow-[0_0_20px_rgba(236,72,153,0.7)]"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-5">
                    Already have an account?{" "}
                    <Link href={route("login")} className="text-pink-400 hover:underline">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
