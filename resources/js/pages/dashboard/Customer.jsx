import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MapPin,
  Clock3,
  Leaf,
  TrendingUp,
  FileText,
  ArrowRight,
  Truck,
} from "lucide-react";

export default function Customer() {
  const quickActions = [
    {
      title: "Book Delivery",
      subtitle: "Send a package quickly",
      icon: <Package size={20} className="text-white" />,
      iconBg: "from-orange-500 to-orange-600",
      path: "/book",
    },
    {
      title: "Track Package",
      subtitle: "See live delivery status",
      icon: <MapPin size={20} className="text-white" />,
      iconBg: "from-sky-500 to-blue-600",
      path: "/track-package",
    },
    {
      title: "Delivery History",
      subtitle: "Check past transactions",
      icon: <Clock3 size={20} className="text-white" />,
      iconBg: "from-violet-500 to-purple-600",
      path: "/history",
    },
  ];

  const recentDeliveries = [
    {
      id: "DEL000",
      date: "Mar 10",
      route: "Quezon City → Pasig",
      price: "₱150",
      status: "Delivered",
    },
    {
      id: "DEL999",
      date: "Mar 9",
      route: "Manila → Taguig",
      price: "₱200",
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f3f4f6] text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#ff7a18] via-[#ff6a3d] to-[#ff4d4d]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Truck size={14} />
              Fast, reliable, and easy delivery
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Welcome back, Maria! <span className="inline-block">👋</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
              Manage your deliveries, track packages in real time, and stay updated
              with your latest transactions in one place.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto -mt-14 max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="group rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(15,23,42,0.12)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconBg} shadow-md`}
                >
                  {item.icon}
                </div>

                <ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-orange-500" size={18} />
              </div>

              <div className="mt-5">
                <h3 className="text-[15px] font-semibold text-slate-900 sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Main Grid */}
        <section className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Active Delivery */}
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Active Delivery
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track your current package status
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                In Transit
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">DEL001</h3>

                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Pickup: SM Mall of Asia</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Drop-off: Makati CBD</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200 sm:min-w-[120px]">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    ETA
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">15 mins</p>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-200" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Driver: <span className="font-medium text-slate-900">Juan Dela Cruz</span>
                </p>

                <Link
                  to="/track-package"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:scale-[1.02] hover:from-orange-600 hover:to-orange-700"
                >
                  Track Live
                </Link>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-green-200/70 bg-gradient-to-br from-green-50 to-emerald-100 p-5 shadow-[0_10px_30px_rgba(34,197,94,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500 shadow-md">
                  <Leaf size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">Eco Impact</h3>
                  <p className="text-sm text-slate-500">Your monthly contribution</p>
                </div>
              </div>

              <p className="text-3xl font-bold tracking-tight text-green-700">12.5 kg</p>
              <p className="mt-2 text-sm text-slate-600">CO₂ saved this month</p>
            </div>

            <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-br from-violet-50 to-purple-100 p-5 shadow-[0_10px_30px_rgba(124,58,237,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600 shadow-md">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">Your Stats</h3>
                  <p className="text-sm text-slate-500">Delivery summary</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2">
                  <span>Total Deliveries</span>
                  <span className="font-semibold text-slate-900">24</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2">
                  <span>This Month</span>
                  <span className="font-semibold text-slate-900">8</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-200/70 bg-gradient-to-br from-blue-50 to-sky-100 p-5 shadow-[0_10px_30px_rgba(59,130,246,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
                  <FileText size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-slate-900">Business Plan</h3>
                  <p className="text-sm text-slate-500">For frequent senders</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-6 text-slate-600">
                Upgrade for bulk deliveries, tracking insights, and better business tools.
              </p>

              <button className="w-full rounded-2xl bg-white py-3 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Recent Deliveries */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Deliveries
              </h2>
              <p className="text-sm text-slate-500">
                Your latest completed transactions
              </p>
            </div>

            <Link
              to="/history"
              className="text-sm font-medium text-slate-700 transition hover:text-orange-500"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recentDeliveries.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.09)]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">
                      {item.id}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {item.status}
                  </span>
                </div>

                <p className="mb-5 text-sm text-slate-600">{item.route}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-500">
                    {item.price}
                  </span>

                  <Link
                    to="/history"
                    className="text-sm font-medium text-slate-700 hover:text-orange-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}