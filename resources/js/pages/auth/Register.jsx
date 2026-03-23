import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showCustomerSignup, setShowCustomerSignup] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setShowPopup(true);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.emailOrPhone || !loginData.password) {
      alert("Please enter your email or phone and password.");
      return;
    }

    navigate("/customer");

    setLoginData({
      emailOrPhone: "",
      password: "",
    });
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#fff,_#f8fafc)] text-slate-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-2"
        >
          {/* Left Side */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 p-10 text-white lg:flex">
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
                    Fast, secure, and reliable delivery
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
                  Join us today
                </p>
                <h2 className="text-[34px] font-bold leading-tight">
                  Create your account and start booking with ease
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-white/85">
                  Sign up to book deliveries, track packages, and manage your
                  account in one clean and simple place.
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
                  <Smartphone size={18} />
                  <p className="text-sm font-semibold">Easy booking</p>
                </div>
                <p className="text-sm text-white/80">
                  Schedule deliveries quickly with a smooth booking flow.
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
                  <p className="text-sm font-semibold">Safe and secure</p>
                </div>
                <p className="text-sm text-white/80">
                  Your account and delivery details stay protected.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Side */}
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-md">
                    <Box size={20} />
                  </div>
                  <h1 className="text-[22px] font-bold tracking-tight text-slate-900">
                    PadalaExpress
                  </h1>
                </div>

                <h2 className="text-[26px] font-bold tracking-tight text-slate-900">
                  {showCustomerSignup ? "Create account" : "Sign in"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {showCustomerSignup
                    ? "Fill in your details to create your customer account."
                    : "Welcome back. Please enter your details to continue."}
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.16}
                className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1.5"
              >
                <button
                  type="button"
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                >
                  Customer
                </button>

                <Link
                  to="/driver-register"
                  className="rounded-xl px-4 py-3 text-center text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
                >
                  Driver
                </Link>
              </motion.div>

              <AnimatePresence mode="wait">
                {showCustomerSignup ? (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleSignup} className="space-y-5">
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                      >
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Full Name
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <User size={18} className="text-slate-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Juan Dela Cruz"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.25}
                      >
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Email
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <Mail size={18} className="text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="juan@email.com"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                      >
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Password
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <Lock size={18} className="text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 transition hover:text-slate-600"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.35}
                      >
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Confirm Password
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <Lock size={18} className="text-slate-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-slate-400 transition hover:text-slate-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </motion.div>

                      <motion.button
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full rounded-2xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                      >
                        Create Account
                      </motion.button>
                    </form>

                    <motion.p
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={0.45}
                      className="mt-6 text-center text-sm text-slate-500"
                    >
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setShowCustomerSignup(false)}
                        className="font-semibold text-orange-500 hover:text-orange-600"
                      >
                        Sign in
                      </button>
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handleLogin} className="space-y-5">
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                      >
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Email or Phone
                        </label>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <Mail size={18} className="text-slate-400" />
                          <input
                            type="text"
                            name="emailOrPhone"
                            value={loginData.emailOrPhone}
                            onChange={handleLoginChange}
                            placeholder="juan@email.com or 09XX XXX XXXX"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                        </div>
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
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-sm">
                          <Lock size={18} className="text-slate-400" />
                          <input
                            type={showLoginPassword ? "text" : "password"}
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            placeholder="Enter your password"
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                            className="text-slate-400 transition hover:text-slate-600"
                          >
                            {showLoginPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
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
                            className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                          />
                          Remember me
                        </label>

                        <button
                          type="button"
                          className="font-medium text-orange-500 transition hover:text-orange-600"
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
                        className="w-full rounded-2xl bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
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
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setShowCustomerSignup(true)}
                        className="font-semibold text-orange-500 hover:text-orange-600"
                      >
                        Sign up
                      </button>
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                className="my-6 border-t border-slate-200"
              />

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.55}
                className="text-center text-xs leading-6 text-slate-400"
              >
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.6}
                className="mt-6 text-center lg:text-left"
              >
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
                >
                  <ArrowLeft size={16} />
                  Back to sign in
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <CheckCircle2 className="h-9 w-9 text-orange-500" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Welcome to PadalaExpress!
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your customer account has been created successfully. You may now
                sign in and start booking deliveries.
              </p>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setShowCustomerSignup(false);
                }}
                className="mt-6 w-full rounded-2xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Continue to Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}