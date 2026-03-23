import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Search,
  Filter,
  Download,
  CalendarDays,
  Star,
  Wallet,
  ArrowUpRight,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  MapPin,
  X,
  User,
} from "lucide-react";

export default function History() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const deliveries = [
    {
      id: "DEL001",
      status: "In Transit",
      vehicle: "Motorcycle",
      pickup: "SM Mall of Asia",
      delivery: "Makati CBD",
      date: "March 11, 2026",
      time: "2:30 PM",
      driver: "Juan Dela Cruz",
      driverPhone: "0917 123 4567",
      amount: "₱185",
      trackable: true,
      rating: 0,
      packageType: "Documents",
      paymentMethod: "Cash on Delivery",
      eta: "20 mins away",
      progress: 70,
      notes: "Please call upon arrival.",
    },
    {
      id: "DEL000",
      status: "Delivered",
      vehicle: "Motorcycle",
      pickup: "Quezon City",
      delivery: "Pasig",
      date: "March 10, 2026",
      time: "10:15 AM",
      driver: "Maria Santos",
      driverPhone: "0918 222 3344",
      amount: "₱150",
      trackable: false,
      rating: 5,
      packageType: "Small Parcel",
      paymentMethod: "GCash",
      eta: "Delivered",
      progress: 100,
      notes: "Delivered successfully.",
    },
    {
      id: "DEL999",
      status: "Delivered",
      vehicle: "Van",
      pickup: "Manila",
      delivery: "Taguig",
      date: "March 9, 2026",
      time: "3:45 PM",
      driver: "Pedro Garcia",
      driverPhone: "0920 555 8821",
      amount: "₱200",
      trackable: false,
      rating: 4,
      packageType: "Large Box",
      paymentMethod: "Card",
      eta: "Delivered",
      progress: 100,
      notes: "Fragile item handled properly.",
    },
    {
      id: "DEL998",
      status: "Delivered",
      vehicle: "Motorcycle",
      pickup: "Makati",
      delivery: "BGC",
      date: "March 8, 2026",
      time: "11:00 AM",
      driver: "Ana Reyes",
      driverPhone: "0935 778 1234",
      amount: "₱120",
      trackable: false,
      rating: 5,
      packageType: "Food Package",
      paymentMethod: "Cash on Delivery",
      eta: "Delivered",
      progress: 100,
      notes: "Fast delivery.",
    },
    {
      id: "DEL997",
      status: "Cancelled",
      vehicle: "Motorcycle",
      pickup: "Alabang",
      delivery: "Paranaque",
      date: "March 7, 2026",
      time: "4:20 PM",
      driver: "",
      driverPhone: "",
      amount: "—",
      trackable: false,
      rating: 0,
      packageType: "Envelope",
      paymentMethod: "—",
      eta: "Cancelled",
      progress: 0,
      notes: "Booking was cancelled before pickup.",
    },
  ];

  const statusStyles = {
    "In Transit": {
      badge: "bg-blue-100 text-blue-700",
      icon: <Clock3 size={14} className="text-blue-600" />,
    },
    Delivered: {
      badge: "bg-green-100 text-green-700",
      icon: <CheckCircle2 size={14} className="text-green-600" />,
    },
    Cancelled: {
      badge: "bg-red-100 text-red-700",
      icon: <XCircle size={14} className="text-red-600" />,
    },
  };

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((item) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(keyword) ||
        item.pickup.toLowerCase().includes(keyword) ||
        item.delivery.toLowerCase().includes(keyword) ||
        item.vehicle.toLowerCase().includes(keyword) ||
        item.status.toLowerCase().includes(keyword) ||
        item.driver.toLowerCase().includes(keyword);

      const matchesStatus =
        selectedStatus === "All" ? true : item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const totalDeliveries = deliveries.length;
  const thisMonth = deliveries.filter((item) =>
    item.date.includes("March")
  ).length;
  const totalSpent = deliveries.reduce((total, item) => {
    const numeric = Number(item.amount.replace(/[^\d]/g, ""));
    return total + (Number.isNaN(numeric) ? 0 : numeric);
  }, 0);

  const handleExportHistory = () => {
    const exportText = filteredDeliveries
      .map(
        (item) =>
          `ID: ${item.id}
Status: ${item.status}
Vehicle: ${item.vehicle}
Pickup: ${item.pickup}
Delivery: ${item.delivery}
Date: ${item.date}
Time: ${item.time}
Driver: ${item.driver || "No driver assigned"}
Amount: ${item.amount}
Payment Method: ${item.paymentMethod}
Package Type: ${item.packageType}
Notes: ${item.notes}
------------------------------`
      )
      .join("\n");

    const blob = new Blob([exportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "delivery-history.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDetailsModal(true);
  };

  const handleTrack = (delivery) => {
    navigate("/track-package", { state: { delivery } });
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setSelectedDelivery(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f1f5f9] text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-6 py-8 shadow-[0_20px_60px_rgba(249,115,22,0.22)] sm:px-8">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Truck size={14} />
                Delivery records and tracking
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Delivery History
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
                View, search, and manage your past deliveries in a cleaner and more modern dashboard.
              </p>
            </div>

            <button
              onClick={handleExportHistory}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              <Download size={16} />
              Export History
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition focus-within:border-orange-400 focus-within:bg-white">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, pickup, destination, vehicle, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
              >
                <option value="All">All Status</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[26px] border border-white/70 bg-white/95 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Deliveries</p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {totalDeliveries}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                <Package size={20} className="text-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/95 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">This Month</p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {thisMonth}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <CalendarDays size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/70 bg-white/95 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Spent</p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  ₱{totalSpent.toLocaleString()}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <Wallet size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 space-y-4">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((item, index) => {
              const statusStyle = statusStyles[item.status];

              return (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/70 bg-white/95 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(15,23,42,0.10)] sm:p-6"
                >
                  <div className="grid gap-6 xl:grid-cols-[1.25fr_0.8fr_0.45fr]">
                    <div>
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                          {item.id}
                        </h3>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle.badge}`}
                        >
                          {statusStyle.icon}
                          {item.status}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {item.vehicle}
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-slate-500">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            <span className="text-sm">Pickup</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900 sm:text-[15px]">
                            {item.pickup}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-slate-500">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                            <span className="text-sm">Delivery</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900 sm:text-[15px]">
                            {item.delivery}
                          </p>
                        </div>
                      </div>

                      {item.rating > 0 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <span className="text-sm text-slate-600">Your rating:</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={15}
                                className={
                                  star <= item.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 text-sm text-slate-600 sm:text-[15px]">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Date & Time</p>
                        <p className="mt-1 font-medium text-slate-900">{item.date}</p>
                        <p>{item.time}</p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Driver</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {item.driver || "No driver assigned"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 xl:items-end">
                      <div className="w-full rounded-2xl bg-orange-50 px-4 py-4 text-left xl:text-right">
                        <p className="text-xs font-medium uppercase tracking-wide text-orange-500">
                          Amount
                        </p>
                        <p className="mt-1 text-xl font-bold text-orange-500">
                          {item.amount}
                        </p>
                      </div>

                      <div className="flex w-full flex-col gap-3 xl:items-end">
                        {item.trackable && (
                          <button
                            onClick={() => handleTrack(item)}
                            className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:from-orange-600 hover:to-orange-700 xl:w-auto"
                          >
                            Track Live
                          </button>
                        )}

                        <button
                          onClick={() => openDetails(item)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-orange-500"
                        >
                          View Details
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <MapPin size={22} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                No deliveries found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter to see more results.
              </p>
            </div>
          )}
        </section>
      </main>

      {showDetailsModal && selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Delivery Details
                </h3>
                <p className="text-sm text-slate-500">{selectedDelivery.id}</p>
              </div>
              <button onClick={closeModals}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.status}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Vehicle
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.vehicle}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Pickup
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.pickup}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Delivery
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.delivery}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Date & Time
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.date} • {selectedDelivery.time}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Payment Method
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.paymentMethod}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Package Type
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.packageType}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Amount
                </p>
                <p className="mt-1 text-sm font-semibold text-orange-500">
                  {selectedDelivery.amount}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Notes
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedDelivery.notes}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
                <div className="mb-2 flex items-center gap-2">
                  <User size={16} className="text-slate-500" />
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Driver
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedDelivery.driver || "No driver assigned"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedDelivery.driverPhone || "No phone available"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModals}
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}