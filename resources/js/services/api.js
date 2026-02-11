import React from "react";
import { ArrowRight, Bike, Store, UtensilsCrossed } from "lucide-react";

export default function CustomerLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
                F
              </div>
              <span className="font-semibold">FoodDelivery</span>
            </div>

            {/* Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
              <a href="#how" className="hover:text-slate-900 transition">
                How it Works
              </a>
              <a href="#features" className="hover:text-slate-900 transition">
                Features
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-10 rounded-full border border-emerald-200 px-5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition"
              >
                Login
              </button>
              <button
                type="button"
                className="h-10 rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-600 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/70 via-white to-white" />

        {/* Decorative shapes (subtle like screenshot) */}
        <div className="pointer-events-none absolute -left-24 top-40 h-32 w-32 rounded-full bg-slate-200/60" />
        <div className="pointer-events-none absolute right-[-180px] top-28 h-[420px] w-[420px] rounded-[80px] border-[10px] border-slate-200/60 opacity-70" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-xs font-medium text-emerald-700 shadow-sm">
              <span>🚀</span>
              <span>The #1 Food Delivery Platform</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Food delivery{" "}
              <span className="text-emerald-500">made simple</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Order food, deliver with ease, or grow your restaurant—all in one
              platform. Join millions of happy users today.
            </p>

            {/* Continue as buttons */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Customer (active) */}
              <button
                type="button"
                className="group relative w-full rounded-2xl bg-emerald-500 px-5 py-4 text-left text-white shadow-md hover:bg-emerald-600 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <UtensilsCrossed className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm opacity-90">Continue as</div>
                      <div className="font-semibold">Customer</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 opacity-90 group-hover:translate-x-0.5 transition" />
                </div>
              </button>

              {/* Rider */}
              <button
                type="button"
                className="group w-full rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                      <Bike className="h-5 w-5 text-slate-700" />
                    </span>
                    <div>
                      <div className="text-sm text-slate-500">Continue as</div>
                      <div className="font-semibold">Rider</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-0.5 transition" />
                </div>
              </button>

              {/* Restaurant */}
              <button
                type="button"
                className="group w-full rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                      <Store className="h-5 w-5 text-slate-700" />
                    </span>
                    <div>
                      <div className="text-sm text-slate-500">Continue as</div>
                      <div className="font-semibold">Restaurant</div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-0.5 transition" />
                </div>
              </button>
            </div>

            {/* Small note */}
            <p className="mt-6 text-xs text-slate-500">
              Frontend demo only — you can later link these buttons to routes
              like <span className="font-medium">/customer</span>,{" "}
              <span className="font-medium">/rider</span>,{" "}
              <span className="font-medium">/restaurant</span>.
            </p>
          </div>
        </div>

        {/* Sections placeholders */}
        <section id="how" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold">How it Works (placeholder)</h2>
            <p className="mt-2 text-slate-600 text-sm">
              Add your steps here later: browse → checkout → rider assigned → delivered.
            </p>
          </div>
        </section>

        <section id="features" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold">Features (placeholder)</h2>
            <p className="mt-2 text-slate-600 text-sm">
              Add features later: live tracking, promos, wallet, ratings, etc.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
