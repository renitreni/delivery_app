import React, { useMemo, useState } from "react";
import {
  Filter,
  Package,
  CheckCircle2,
  Star,
  XCircle,
  CalendarDays,
  Clock3,
  MapPin,
  Eye,
  ChevronRight,
  BadgeCheck,
  Wallet,
} from "lucide-react";

export default function DriverHistory() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const deliveries = [
    {
      id: "DEL120",
      customer: "Anna Santos",
      pickup: "BGC Central Square",
      dropoff: "Ayala Avenue, Makati",
      status: "Completed",
      rating: 5,
      earnings: 150,
      date: "2026-03-22",
      time: "10:30 AM",
      notes: "Package delivered successfully and received by customer.",
    },
    {
      id: "DEL119",
      customer: "Roberto Tan",
      pickup: "Ortigas Center",
      dropoff: "Greenhills Shopping Center",
      status: "Completed",
      rating: 4,
      earnings: 95,
      date: "2026-03-22",
      time: "09:15 AM",
      notes: "Smooth delivery with minimal waiting time.",
    },
    {
      id: "DEL118",
      customer: "Lisa Garcia",
      pickup: "Mall of Asia",
      dropoff: "Paranaque City Hall",
      status: "Completed",
      rating: 5,
      earnings: 120,
      date: "2026-03-21",
      time: "06:45 PM",
      notes: "Delivered on time during evening schedule.",
    },
    {
      id: "DEL117",
      customer: "Mark Johnson",
      pickup: "Alabang Town Center",
      dropoff: "Las Pinas",
      status: "Cancelled",
      rating: 0,
      earnings: 0,
      date: "2026-03-21",
      time: "05:20 PM",
      notes: "Delivery was cancelled before pickup.",
    },
    {
      id: "DEL116",
      customer: "Sofia Reyes",
      pickup: "Quezon City Hall",
      dropoff: "University of the Philippines",
      status: "Completed",
      rating: 5,
      earnings: 110,
      date: "2026-03-21",
      time: "03:10 PM",
      notes: "Fast and successful delivery.",
    },
    {
      id: "DEL115",
      customer: "Carlos Mendoza",
      pickup: "Makati CBD",
      dropoff: "Fort Bonifacio",
      status: "Completed",
      rating: 4,
      earnings: 85,
      date: "2026-03-21",
      time: "01:30 PM",
      notes: "Customer received order without issues.",
    },
  ];

  const filteredDeliveries = useMemo(() => {
    if (selectedFilter === "completed") {
      return deliveries.filter((item) => item.status === "Completed");
    }

    if (selectedFilter === "cancelled") {
      return deliveries.filter((item) => item.status === "Cancelled");
    }

    return deliveries;
  }, [selectedFilter]);

  const stats = useMemo(() => {
    const completed = deliveries.filter((item) => item.status === "Completed");
    const cancelled = deliveries.filter((item) => item.status === "Cancelled");
    const ratingsOnly = completed.filter((item) => item.rating > 0);

    const averageRating =
      ratingsOnly.reduce((sum, item) => sum + item.rating, 0) /
        ratingsOnly.length || 0;

    const totalEarnings = completed.reduce(
      (sum, item) => sum + item.earnings,
      0
    );

    return {
      totalDeliveries: deliveries.length,
      completedCount: completed.length,
      cancelledCount: cancelled.length,
      averageRating: averageRating.toFixed(1),
      totalEarnings,
    };
  }, [deliveries]);

  const renderStars = (count, size = 16) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= count
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />
        ))}
      </div>
    );
  };

  const filterButtons = [
    {
      key: "all",
      label: "All",
      icon: <Filter size={16} />,
      activeClass: "border-blue-200 bg-blue-50 text-blue-700",
    },
    {
      key: "completed",
      label: "Completed",
      icon: <CheckCircle2 size={16} />,
      activeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      icon: <XCircle size={16} />,
      activeClass: "border-rose-200 bg-rose-50 text-rose-700",
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
                <Package size={16} />
                Driver delivery records
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Delivery History
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Review your completed and cancelled deliveries, check ratings,
                and see your recent earnings in one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">Total</p>
                <p className="mt-1 text-xl font-bold">{stats.totalDeliveries}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">Completed</p>
                <p className="mt-1 text-xl font-bold">{stats.completedCount}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md col-span-2 sm:col-span-1">
                <p className="text-xs text-slate-300">Rating</p>
                <p className="mt-1 text-xl font-bold">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="mt-6 flex flex-wrap gap-3">
          {filterButtons.map((button) => (
            <button
              key={button.key}
              type="button"
              onClick={() => setSelectedFilter(button.key)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition ${
                selectedFilter === button.key
                  ? button.activeClass
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {button.icon}
              {button.label}
            </button>
          ))}
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Deliveries
                </p>
                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.totalDeliveries}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <Package size={22} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.completedCount}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle2 size={22} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Earnings
                </p>
                <h3 className="mt-3 text-3xl font-bold text-emerald-600">
                  ₱{stats.totalEarnings}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <Wallet size={22} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Average Rating
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <h3 className="text-3xl font-bold text-slate-900">
                    {stats.averageRating}
                  </h3>
                  {renderStars(Math.round(Number(stats.averageRating)), 15)}
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                <Star size={22} className="text-amber-500" />
              </div>
            </div>
          </div>
        </section>

        {/* History Cards */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Recent Deliveries
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View all of your latest booking activity
            </p>
          </div>

          <div className="space-y-5">
            {filteredDeliveries.map((item) => (
              <div
                key={item.id}
                className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.id}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                          item.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">
                        {item.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Customer</p>
                        <p className="text-base font-semibold text-slate-800">
                          {item.customer}
                        </p>
                      </div>
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
                        <CalendarDays size={16} />
                        <span>{item.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        <span>{item.time}</span>
                      </div>

                      {item.status === "Completed" && (
                        <div className="flex items-center gap-2">
                          <BadgeCheck size={16} className="text-emerald-600" />
                          {renderStars(item.rating)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 lg:min-w-[200px] lg:items-end">
                    <div className="rounded-[24px] bg-gradient-to-br from-blue-50 to-indigo-50 px-5 py-4 ring-1 ring-blue-100 lg:text-right">
                      <p className="text-sm text-slate-500">
                        {item.status === "Completed"
                          ? "Earnings"
                          : "Delivery Status"}
                      </p>
                      <p
                        className={`mt-1 text-2xl font-bold ${
                          item.status === "Completed"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {item.status === "Completed"
                          ? `₱${item.earnings}`
                          : "Cancelled"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDelivery(item)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Eye size={16} />
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDeliveries.length === 0 && (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center">
                <p className="text-base text-slate-500">
                  No deliveries found for this filter.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Delivery Details
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Full information about this delivery record
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDelivery(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Delivery ID</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedDelivery.id}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Customer</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedDelivery.customer}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Date</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedDelivery.date}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Time</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedDelivery.time}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs text-slate-400">Pickup Location</p>
                <div className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                  <MapPin size={16} className="text-emerald-600" />
                  {selectedDelivery.pickup}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs text-slate-400">Drop-off Location</p>
                <div className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                  <MapPin size={16} className="text-rose-600" />
                  {selectedDelivery.dropoff}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Status</p>
                <p
                  className={`mt-1 font-semibold ${
                    selectedDelivery.status === "Completed"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {selectedDelivery.status}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-400">Earnings</p>
                <p className="mt-1 font-semibold text-slate-900">
                  ₱{selectedDelivery.earnings}
                </p>
              </div>

              {selectedDelivery.status === "Completed" && (
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs text-slate-400">Rating</p>
                  <div className="mt-2">
                    {renderStars(selectedDelivery.rating, 18)}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs text-slate-400">Notes</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {selectedDelivery.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}