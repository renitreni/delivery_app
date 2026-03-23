import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleDollarSign,
  CheckCircle2,
  Star,
  Clock3,
  MapPinned,
  Timer,
  Package,
  Lightbulb,
  Smile,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function Driver() {
  const [isOnline, setIsOnline] = useState(false);

  const deliveries = [
    {
      id: "DEL002",
      pickup: "SM Mall of Asia",
      dropoff: "Makati CBD",
      distance: "12 km",
      time: "35 mins",
      customer: "Maria Cruz",
      initials: "MC",
      earnings: "₱185",
      priority: false,
    },
    {
      id: "DEL003",
      pickup: "Quezon City Hall",
      dropoff: "UP Diliman",
      distance: "5 km",
      time: "15 mins",
      customer: "Pedro Santos",
      initials: "PS",
      earnings: "₱120",
      priority: true,
    },
  ];

  const quickActions = [
    {
      label: "View Earnings",
      icon: <CircleDollarSign size={18} />,
      path: "/earnings",
    },
    {
      label: "My Reviews",
      icon: <Star size={18} />,
      path: "/driver-history",
    },
    {
      label: "Delivery History",
      icon: <Package size={18} />,
      path: "/driver-history",
    },
  ];

  const stats = [
    {
      title: "Today's Earnings",
      value: "₱1,850",
      icon: <CircleDollarSign size={24} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      valueColor: "text-emerald-600",
    },
    {
      title: "Completed",
      value: "12",
      icon: <CheckCircle2 size={24} className="text-sky-600" />,
      bg: "bg-sky-50",
      valueColor: "text-slate-900",
    },
    {
      title: "Rating",
      value: "4.9",
      icon: <Star size={24} className="text-amber-500" />,
      bg: "bg-amber-50",
      valueColor: "text-slate-900",
      extra: (
        <Star size={18} className="fill-amber-400 text-amber-400" />
      ),
    },
    {
      title: "Online Hours",
      value: "6.5h",
      icon: <Clock3 size={24} className="text-violet-600" />,
      bg: "bg-violet-50",
      valueColor: "text-slate-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800">
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Header */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 left-20 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <Smile size={16} />
                Welcome back, driver
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Hi, Juan 👋
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Manage your delivery requests, track your performance, and stay
                online to get more bookings today.
              </p>
            </div>

            <div className="w-full max-w-sm rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-200">Driver Status</p>
                  <p className="mt-1 text-base font-semibold">
                    {isOnline ? "You are online" : "You are offline"}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {isOnline
                      ? "You can now receive delivery requests."
                      : "Turn on to start receiving bookings."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOnline(!isOnline)}
                  className={`relative h-9 w-16 rounded-full transition-all duration-300 ${
                    isOnline ? "bg-emerald-500" : "bg-white/25"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      isOnline ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <h3 className={`text-2xl font-bold md:text-3xl ${stat.valueColor}`}>
                      {stat.value}
                    </h3>
                    {stat.extra && stat.extra}
                  </div>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Main Layout */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.85fr_1fr]">
          {/* Deliveries */}
          <section>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Available Deliveries
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose a delivery request you want to accept
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <Zap size={16} className="text-amber-500" />
                {deliveries.length} active requests
              </div>
            </div>

            <div className="space-y-5">
              {deliveries.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.id}
                        </h3>

                        {item.priority && (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold tracking-wide text-red-600">
                            PRIORITY
                          </span>
                        )}
                      </div>

                      <div className="mt-5 grid gap-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                          <span className="h-3 w-3 rounded-full bg-emerald-500" />
                          <div>
                            <p className="text-xs text-slate-400">Pickup</p>
                            <p className="text-sm font-semibold text-slate-700 md:text-base">
                              {item.pickup}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                          <span className="h-3 w-3 rounded-full bg-rose-500" />
                          <div>
                            <p className="text-xs text-slate-400">Drop-off</p>
                            <p className="text-sm font-semibold text-slate-700 md:text-base">
                              {item.dropoff}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <MapPinned size={16} />
                          <span>{item.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer size={16} />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-gradient-to-br from-blue-50 to-indigo-50 px-5 py-4 ring-1 ring-blue-100 lg:min-w-[185px] lg:text-right">
                      <p className="text-sm text-slate-500">Estimated earnings</p>
                      <p className="mt-1 text-2xl font-bold text-blue-600 md:text-3xl">
                        {item.earnings}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">
                          {item.initials}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Customer</p>
                          <p className="text-sm font-semibold text-slate-800 md:text-base">
                            {item.customer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Decline
                        </button>

                        <Link
                          to="/track"
                          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700"
                        >
                          Accept Delivery
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>

              <div className="mt-5 space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600">{action.icon}</span>
                      <span>{action.label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-900">This Week</h3>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Deliveries</span>
                  <span className="font-semibold text-slate-900">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Earnings</span>
                  <span className="font-semibold text-emerald-600">₱7,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Avg. Rating</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    4.9
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hours Online</span>
                  <span className="font-semibold text-slate-900">32.5h</span>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                  <Lightbulb size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Driver Tip</h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-blue-50">
                Peak hours are 11AM–2PM and 5PM–8PM. Staying online during
                these times can help you get more bookings and boost your
                daily earnings.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}