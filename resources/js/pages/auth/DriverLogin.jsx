import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Lock,
  ArrowLeft,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function DriverLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.phone.trim() || !loginData.password.trim()) {
      alert("Please enter your phone number and password.");
      return;
    }

    navigate("/driver");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff,_#f8fafc)] text-slate-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-2"
        >
          <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-10 text-white lg:flex">
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.05}
                className="mb-8 flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Box size={24} />
                </div>
                <div>
                  <h1 className="text-[24px] font-bold tracking-tight">
                    PadalaExpress
                  </h1>
                  <p className="text-sm text-white/80">
                    Driver delivery dashboard
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.15}
                className="max-w-md"
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                  Welcome back
                </p>
                <h2 className="text-[34px] font-bold leading-tight">
                  Sign in and start delivering smoothly
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-white/85">
                  Access your assigned deliveries, update package status, and
                  manage your day with a cleaner and easier driver dashboard.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.25}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/15 p-4 backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Truck size={18} />
                  <p className="text-sm font-semibold">Track active deliveries</p>
                </div>
                <p className="text-sm text-white/80">
                  View pickups, drop-offs, and routes in one place.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.35}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white/15 p-4 backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} />
                  <p className="text-sm font-semibold">Secure account access</p>
                </div>
                <p className="text-sm text-white/80">
                  Keep your driver account protected while staying connected.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white/80 px-5 py-8 sm:px-8 sm:py-10">
            <div className="w-full max-w-md">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="mb-8 text-center lg:text-left"
              >
                <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                    <Box size={20} />
                  </div>
                  <h1 className="text-[22px] font-bold tracking-tight text-slate-900">
                    PadalaExpress
                  </h1>
                </div>

                <h2 className="text-[26px] font-bold tracking-tight text-slate-900">
                  Driver Sign in
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Welcome back. Please enter your details to continue.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.16}
                className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5"
              >
                <Link
                  to="/login"
                  className="rounded-xl px-4 py-3 text-center text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
                >
                  Customer
                </Link>

                <button
                  type="button"
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                >
                  Driver
                </button>
              </motion.div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.2}
                >
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm"
                  >
                    <Phone size={18} className="text-slate-400" />
                    <input
                      type="text"
                      name="phone"
                      value={loginData.phone}
                      onChange={handleChange}
                      placeholder="09XX XXX XXXX"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.25}
                >
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm"
                  >
                    <Lock size={18} className="text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.3}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <label className="flex items-center gap-2 text-slate-500">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.35}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  Sign In
                </motion.button>
              </form>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="mt-6 text-center text-sm text-slate-500"
              >
                New driver?{" "}
                <Link
                  to="/driver-register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Register here
                </Link>
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.45}
                className="my-6 border-t border-slate-200"
              />

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                className="text-center text-xs leading-6 text-slate-400"
              >
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.55}
                className="mt-6 text-center lg:text-left"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
                >
                  <ArrowLeft size={16} />
                  Back to home
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}