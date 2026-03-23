import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Truck,
  Zap,
  MapPin,
  Leaf,
  ShieldCheck,
  Package,
  ArrowRight,
  Sparkles,
  Clock3,
  X,
  Phone,
  Mail,
  Briefcase,
  Newspaper,
  HelpCircle,
  FileText,
  Lock,
  Cookie,
  Info,
  Star,
  CheckCircle2,
  Wallet,
  Navigation,
} from "lucide-react";

export default function PadalaExpress() {
  const [activeFooterPage, setActiveFooterPage] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      key: "route",
      title: "AI Route Optimization",
      desc: "Smart route suggestions help deliveries arrive faster while saving time and fuel for every trip.",
      icon: <Zap size={20} className="text-white" />,
      iconBg: "from-blue-500 via-cyan-500 to-sky-500",
    },
    {
      key: "multi",
      title: "Multi-Stop Delivery",
      desc: "Perfect for personal and business deliveries with multiple drop-off points in one booking.",
      icon: <MapPin size={20} className="text-white" />,
      iconBg: "from-orange-500 via-amber-500 to-yellow-400",
    },
    {
      key: "eco",
      title: "Eco-Friendly Tracking",
      desc: "Track deliveries while supporting greener transport choices and smarter route planning.",
      icon: <Leaf size={20} className="text-white" />,
      iconBg: "from-green-500 via-emerald-500 to-lime-400",
    },
    {
      key: "locker",
      title: "Smart Locker Pickup",
      desc: "Secure parcel pickup anytime through convenient and flexible locker access points.",
      icon: <Package size={20} className="text-white" />,
      iconBg: "from-purple-500 via-fuchsia-500 to-pink-500",
    },
    {
      key: "emergency",
      title: "Emergency Delivery",
      desc: "For urgent bookings, priority handling helps your time-sensitive package move faster.",
      icon: <Clock3 size={20} className="text-white" />,
      iconBg: "from-rose-500 via-red-500 to-orange-500",
    },
    {
      key: "price",
      title: "Secure Price Options",
      desc: "Choose delivery options that match your budget with clear, secure, and easy pricing choices.",
      icon: <ShieldCheck size={20} className="text-white" />,
      iconBg: "from-yellow-500 via-orange-500 to-amber-600",
    },
  ];

  const featureDetails = useMemo(
    () => ({
      route: {
        title: "AI Route Optimization",
        subtitle: "Smarter delivery routes with less delay",
        points: [
          "Chooses faster and more efficient delivery paths",
          "Helps reduce fuel cost and travel time",
          "Improves scheduling for busy delivery hours",
          "Makes booking more reliable for customers and drivers",
        ],
        description:
          "This feature helps drivers and the system choose the best possible route based on delivery flow, time, and convenience. It is designed to make each trip quicker and more efficient.",
      },
      multi: {
        title: "Multi-Stop Delivery",
        subtitle: "One booking for multiple destinations",
        points: [
          "Send to several addresses in one trip",
          "Useful for small businesses and group deliveries",
          "Saves time when dropping multiple packages",
          "Keeps deliveries more organized in one booking",
        ],
        description:
          "Multi-stop delivery allows a customer to create one delivery with several drop-off points, making bulk or grouped deliveries easier to manage.",
      },
      eco: {
        title: "Eco-Friendly Tracking",
        subtitle: "Greener delivery choices with better visibility",
        points: [
          "Supports smarter delivery movement",
          "Encourages efficient trip planning",
          "Reduces unnecessary travel when routes are optimized",
          "Lets users feel more aware of sustainable options",
        ],
        description:
          "This feature focuses on responsible delivery planning by reducing wasteful movement and helping create more efficient routes while keeping tracking easy to follow.",
      },
      locker: {
        title: "Smart Locker Pickup",
        subtitle: "Pickup that is flexible and secure",
        points: [
          "Collect parcels anytime from available lockers",
          "Useful for customers with busy schedules",
          "Improves package safety before pickup",
          "Adds another convenient delivery option",
        ],
        description:
          "Smart Locker Pickup gives customers a flexible way to receive parcels safely from designated pickup lockers instead of waiting for direct handoff.",
      },
      emergency: {
        title: "Emergency Delivery",
        subtitle: "Priority service for urgent packages",
        points: [
          "Best for time-sensitive items",
          "Faster handling than standard delivery",
          "Can prioritize urgent customer requests",
          "Useful for important documents or last-minute needs",
        ],
        description:
          "Emergency Delivery is designed for urgent bookings that need faster action and priority handling from pickup to drop-off.",
      },
      price: {
        title: "Secure Price Options",
        subtitle: "Clear pricing that fits your budget",
        points: [
          "Shows pricing choices more clearly",
          "Makes it easier to compare delivery options",
          "Helps customers choose the best value",
          "Supports a more transparent booking experience",
        ],
        description:
          "Secure Price Options gives users a simple and trustworthy way to review delivery costs and select a service that matches their needs and budget.",
      },
    }),
    []
  );

  const payments = ["Cash", "GCash", "Maya", "Credit Card"];

  const footerContent = useMemo(
    () => ({
      about: {
        title: "About Us",
        icon: <Info size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              PadalaExpress is a smart and modern delivery platform built for fast,
              secure, and reliable package transport.
            </p>
            <p>
              Our goal is to make booking, tracking, and managing deliveries easier
              for customers, drivers, and businesses.
            </p>
            <p>
              <span className="font-semibold text-slate-900">
                Develop by Smart Inbox Technology
              </span>{" "}
              with focus on real-time tools, better user experience, and smarter
              logistics solutions.
            </p>
          </div>
        ),
      },
      careers: {
        title: "Careers",
        icon: <Briefcase size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              Build the future of delivery with us. We’re looking for passionate
              people who want to improve logistics through design and technology.
            </p>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <p className="font-semibold text-slate-900">Open Positions</p>
              <ul className="mt-2 space-y-2">
                <li>• Frontend Developer</li>
                <li>• Backend Developer</li>
                <li>• UI/UX Designer</li>
                <li>• Customer Support</li>
              </ul>
            </div>
            <p>
              Apply at{" "}
              <span className="font-medium text-orange-600">
                careers@padalaexpress.com
              </span>
            </p>
          </div>
        ),
      },
      press: {
        title: "Press",
        icon: <Newspaper size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              PadalaExpress continues to improve digital delivery services through
              modern tools, better tracking, and customer-first design.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">Platform Updates</p>
                <p className="mt-2 text-sm text-slate-600">
                  Better tracking, faster bookings, and smoother delivery management.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">Media Contact</p>
                <p className="mt-2 text-sm text-slate-600">
                  Reach our media team for announcements and brand information.
                </p>
              </div>
            </div>
            <p>
              Contact:{" "}
              <span className="font-medium text-orange-600">
                press@padalaexpress.com
              </span>
            </p>
          </div>
        ),
      },
      help: {
        title: "Help Center",
        icon: <HelpCircle size={18} />,
        content: (
          <div className="space-y-3 text-[15px] leading-7 text-slate-600">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">How do I book a delivery?</p>
              <p className="mt-2 text-sm">
                Sign up, enter pickup and drop-off details, choose payment, then confirm.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">How do I track my package?</p>
              <p className="mt-2 text-sm">
                Go to your dashboard and use the tracking section to view live updates.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">
                What payment methods are available?
              </p>
              <p className="mt-2 text-sm">
                Cash, GCash, Maya, and Credit Card are available.
              </p>
            </div>
          </div>
        ),
      },
      safety: {
        title: "Safety",
        icon: <ShieldCheck size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              Safety is one of our top priorities for customers, drivers, and every delivery.
            </p>
            <ul className="space-y-2">
              <li>• Verified user and driver information</li>
              <li>• Real-time tracking and status updates</li>
              <li>• Secure booking and package handling process</li>
              <li>• Clear communication during delivery</li>
            </ul>
          </div>
        ),
      },
      contact: {
        title: "Contact",
        icon: <Phone size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                <span>+63 917 000 1234</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                <span>support@padalaexpress.com</span>
              </div>
            </div>
            <p>
              Our support team is ready to help with bookings, tracking, account issues,
              and delivery concerns.
            </p>
          </div>
        ),
      },
      terms: {
        title: "Terms of Service",
        icon: <FileText size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              By using PadalaExpress, users agree to provide accurate details and use the
              platform responsibly.
            </p>
            <p>
              Delivery schedules, pricing, and service rules may be updated to improve
              platform performance and safety.
            </p>
          </div>
        ),
      },
      privacy: {
        title: "Privacy Policy",
        icon: <Lock size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              We collect only the information needed for booking, account security,
              delivery coordination, and customer support.
            </p>
            <p>
              Your data is handled responsibly to help provide a safe and smooth experience.
            </p>
          </div>
        ),
      },
      cookie: {
        title: "Cookie Policy",
        icon: <Cookie size={18} />,
        content: (
          <div className="space-y-4 text-[15px] leading-7 text-slate-600">
            <p>
              Cookies are used to improve browsing, remember preferences, and support
              essential website functionality.
            </p>
            <p>
              Continued use of the platform means you accept essential cookie usage.
            </p>
          </div>
        ),
      },
    }),
    []
  );

  const footerLinks = {
    company: [
      { label: "About Us", key: "about" },
      { label: "Careers", key: "careers" },
      { label: "Press", key: "press" },
    ],
    support: [
      { label: "Help Center", key: "help" },
      { label: "Safety", key: "safety" },
      { label: "Contact", key: "contact" },
    ],
    legal: [
      { label: "Terms of Service", key: "terms" },
      { label: "Privacy Policy", key: "privacy" },
      { label: "Cookie Policy", key: "cookie" },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay,
      },
    }),
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7ed_0%,#fff1f2_22%,#eff6ff_52%,#ffffff_100%)] text-slate-900">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-80px] top-[-60px] h-[320px] w-[320px] rounded-full bg-orange-300/30 blur-3xl" />
          <div className="absolute right-[-80px] top-[80px] h-[340px] w-[340px] rounded-full bg-pink-300/25 blur-3xl" />
          <div className="absolute bottom-[-80px] left-[10%] h-[280px] w-[280px] rounded-full bg-yellow-200/20 blur-3xl" />
          <div className="absolute bottom-[60px] right-[8%] h-[260px] w-[260px] rounded-full bg-cyan-200/25 blur-3xl" />
        </div>

        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-lg shadow-orange-200">
                <Box size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-[18px] font-extrabold tracking-tight text-slate-900">
                  PadalaExpress
                </h1>
                <p className="text-[12px] text-slate-500">
                  Develop by Smart Inbox Technology
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-[14px] font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-5 text-[14px] font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        <section className="relative">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-orange-600 shadow-sm"
              >
                <Sparkles size={14} />
                Smart logistics made simple
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="max-w-2xl text-[40px] font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[52px] md:text-[64px]"
              >
                Deliver Faster
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Smarter & Safer
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-6 max-w-xl text-[15px] leading-8 text-slate-600 md:text-[16px]"
              >
                Book, manage, and track deliveries with a modern platform designed
                for customers and drivers. Simple experience, premium look, and
                reliable service in one app.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  to="/register"
                  className="inline-flex h-[54px] min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 text-[15px] font-semibold text-white shadow-xl shadow-orange-200 transition hover:scale-[1.02]"
                >
                  Book Now
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/driver-login"
                  className="inline-flex h-[54px] min-w-[180px] items-center justify-center rounded-2xl border border-orange-200 bg-white/90 px-6 text-[15px] font-semibold text-slate-700 shadow-sm transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Drive with Us
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.26 }}
                className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3"
              >
                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-orange-100/40 backdrop-blur-md">
                  <p className="text-[12px] text-slate-500">Delivery Speed</p>
                  <p className="mt-1 text-[22px] font-extrabold text-slate-900">24/7</p>
                </div>

                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-pink-100/40 backdrop-blur-md">
                  <p className="text-[12px] text-slate-500">User Rating</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[22px] font-extrabold text-slate-900">4.9</span>
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-cyan-100/40 backdrop-blur-md">
                  <p className="text-[12px] text-slate-500">Payments</p>
                  <p className="mt-1 text-[22px] font-extrabold text-slate-900">Easy</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 28, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative z-10 flex items-center justify-center md:justify-end"
            >
              <div className="relative w-full max-w-[560px]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-10 z-20 hidden w-[190px] rounded-3xl border border-white/60 bg-white/85 p-4 shadow-2xl backdrop-blur-md md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Delivery Status</p>
                      <p className="text-sm font-bold text-slate-900">Package Confirmed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 right-0 z-20 hidden w-[200px] rounded-3xl border border-white/60 bg-white/85 p-4 shadow-2xl backdrop-blur-md md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Payment Method</p>
                      <p className="text-sm font-bold text-slate-900">GCash Ready</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-auto w-[300px] rounded-[40px] border-[10px] border-slate-900 bg-slate-900 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.35)] md:mr-10"
                >
                  <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
                    <div className="px-5 pb-6 pt-5 text-white">
                      <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-white/40" />

                      <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-white/80">Active Booking</p>
                            <p className="mt-1 text-lg font-bold">Parcel Delivery</p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                            <Truck size={24} className="text-white" />
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl bg-white/15 p-3">
                            <div className="flex items-start gap-3">
                              <MapPin size={16} className="mt-0.5" />
                              <div>
                                <p className="text-[11px] text-white/80">Pickup</p>
                                <p className="text-sm font-medium">Sta. Rosa, Laguna</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white/15 p-3">
                            <div className="flex items-start gap-3">
                              <Navigation size={16} className="mt-0.5" />
                              <div>
                                <p className="text-[11px] text-white/80">Drop-off</p>
                                <p className="text-sm font-medium">Calamba, Laguna</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-white p-3 text-slate-900">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-slate-500">Estimated Fare</p>
                              <p className="text-lg font-extrabold">₱149</p>
                            </div>
                            <button className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white">
                              Book
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                          <p className="text-[11px] text-white/80">Tracking</p>
                          <p className="mt-1 text-base font-bold">Live Updates</p>
                        </div>
                        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                          <p className="text-[11px] text-white/80">Driver</p>
                          <p className="mt-1 text-base font-bold">Assigned</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-[30px] font-extrabold tracking-tight text-slate-900 md:text-[38px]">
                Premium Features Built for Convenience
              </h2>
              <p className="mt-3 text-[15px] text-slate-600 md:text-[16px]">
                Modern delivery tools designed to make every transaction faster and easier
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((item, index) => (
                <motion.div
                  key={item.key}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-orange-100/30 backdrop-blur-md transition"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-orange-50 opacity-80" />
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-200/30 blur-2xl transition group-hover:bg-pink-200/30" />

                  <div className="relative z-10">
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconBg} shadow-lg`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="mb-3 text-[18px] font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="text-[14px] leading-7 text-slate-600 md:text-[15px]">
                      {item.desc}
                    </p>

                    <button
                      onClick={() => setActiveFeature(item.key)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-600 transition hover:text-red-500"
                    >
                      Learn more <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-8 md:px-8 md:py-10">
          <div className="mx-auto max-w-6xl rounded-[34px] border border-white/60 bg-gradient-to-br from-white via-orange-50 to-pink-50 px-6 py-12 shadow-xl shadow-orange-100/40 md:px-10">
            <div className="text-center">
              <h2 className="text-[28px] font-extrabold tracking-tight text-slate-900 md:text-[34px]">
                Multiple Payment Options
              </h2>
              <p className="mt-3 text-[15px] text-slate-600 md:text-[16px]">
                Flexible and convenient ways to pay for your booking
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {payments.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/60 bg-white px-5 py-4 text-center text-[15px] font-semibold text-slate-700 shadow-md shadow-orange-100/30 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-14 text-center text-white shadow-[0_24px_60px_rgba(249,115,22,0.28)] md:px-10">
            <h2 className="text-[30px] font-extrabold tracking-tight md:text-[40px]">
              Ready to send your package?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/90 md:text-[16px]">
              Experience a more premium way of booking and tracking deliveries with
              PadalaExpress.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex h-[52px] min-w-[170px] items-center justify-center rounded-2xl bg-white px-6 text-[15px] font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                Book Now
              </Link>

              <Link
                to="/driver-login"
                className="inline-flex h-[52px] min-w-[170px] items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 text-[15px] font-semibold text-white transition hover:bg-white/20"
              >
                Drive with Us
              </Link>
            </div>
          </div>
        </section>

        <footer className="relative bg-slate-950 px-5 py-14 text-slate-300 md:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_24%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 md:grid-cols-4">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
                    <Box size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white">PadalaExpress</h3>
                    <p className="text-[12px] text-slate-400">
                      Develop by Smart Inbox Technology
                    </p>
                  </div>
                </div>
                <p className="max-w-[260px] text-[14px] leading-7 text-slate-400">
                  Fast, safe, and convenient delivery service designed for modern users.
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-[15px] font-semibold text-white">Company</h4>
                <ul className="space-y-3 text-[14px]">
                  {footerLinks.company.map((item) => (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveFooterPage(item.key)}
                        className="transition hover:text-orange-400"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-[15px] font-semibold text-white">Support</h4>
                <ul className="space-y-3 text-[14px]">
                  {footerLinks.support.map((item) => (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveFooterPage(item.key)}
                        className="transition hover:text-orange-400"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-[15px] font-semibold text-white">Legal</h4>
                <ul className="space-y-3 text-[14px]">
                  {footerLinks.legal.map((item) => (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveFooterPage(item.key)}
                        className="transition hover:text-orange-400"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-center text-[13px] text-slate-500">
              © 2026 PadalaExpress. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFeature(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-2xl"
            >
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/80">Feature details</p>
                    <h3 className="mt-1 text-[26px] font-extrabold">
                      {featureDetails[activeFeature]?.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/90">
                      {featureDetails[activeFeature]?.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveFeature(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-white/25"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                <p className="text-[15px] leading-8 text-slate-600">
                  {featureDetails[activeFeature]?.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {featureDetails[activeFeature]?.points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/60 p-4"
                    >
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-[14px] leading-7 text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeFooterPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFooterPage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-orange-50 via-white to-pink-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-md">
                    {footerContent[activeFooterPage]?.icon}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-slate-900">
                      {footerContent[activeFooterPage]?.title}
                    </h3>
                    <p className="text-sm text-slate-500">PadalaExpress information</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveFooterPage(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                {footerContent[activeFooterPage]?.content}
              </div>

              <div className="border-t border-slate-100 px-6 py-4">
                <button
                  onClick={() => setActiveFooterPage(null)}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}