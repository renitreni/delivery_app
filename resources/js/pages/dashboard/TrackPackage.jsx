import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock3,
  CheckCircle2,
  Navigation,
  X,
  User,
  ShieldAlert,
  Bike,
  Truck,
  Package,
} from "lucide-react";

export default function TrackPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const delivery = location.state?.delivery;

  const [showChatModal, setShowChatModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "driver",
      text: "Hello, I’m on the way with your package.",
      time: "2:52 PM",
    },
    {
      id: 2,
      sender: "customer",
      text: "Okay, thank you. Please call me when you arrive.",
      time: "2:53 PM",
    },
  ]);

  const fallbackDelivery = {
    id: "DEL001",
    status: "In Transit",
    vehicle: "Motorcycle",
    pickup: "SM Mall of Asia, Pasay City",
    delivery: "Makati CBD, Ayala Avenue",
    date: "March 11, 2026",
    time: "2:30 PM",
    driver: "Juan Dela Cruz",
    driverPhone: "0917 123 4567",
    amount: "₱185",
    trackable: true,
    rating: 4.8,
    packageType: "Documents",
    paymentMethod: "Cash on Delivery",
    eta: "12 mins",
    progress: 65,
    notes: "Please call upon arrival.",
  };

  const currentDelivery = delivery || fallbackDelivery;

  const driverInitials = useMemo(() => {
    const parts = currentDelivery.driver?.split(" ").filter(Boolean) || [];
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`
      : parts[0]?.[0] || "DR";
  }, [currentDelivery.driver]);

  const vehicleIcon =
    currentDelivery.vehicle?.toLowerCase() === "van" ? (
      <Truck size={20} className="text-orange-500" />
    ) : (
      <Bike size={20} className="text-orange-500" />
    );

  const mapQuery = encodeURIComponent(
    `${currentDelivery.pickup} to ${currentDelivery.delivery}`
  );

  const progressValue = Math.max(
    0,
    Math.min(Number(currentDelivery.progress || 0), 100)
  );

  const arrivalText =
    currentDelivery.status === "Delivered"
      ? "Delivered"
      : currentDelivery.status === "Cancelled"
      ? "Cancelled"
      : currentDelivery.eta || "12 mins";

  const onTimeLabel =
    currentDelivery.status === "Delivered"
      ? "Completed"
      : currentDelivery.status === "Cancelled"
      ? "Cancelled"
      : "On Time";

  const timeline = useMemo(() => {
    const progress = progressValue;

    return [
      {
        title: "Order Placed",
        time: currentDelivery.time || "2:30 PM",
        done: true,
        current: false,
      },
      {
        title: "Driver Assigned",
        time: "A few minutes after booking",
        done: true,
        current: false,
      },
      {
        title: "Picked Up",
        time: progress >= 45 ? "Package picked up" : "Waiting for pickup",
        done: progress >= 45,
        current: progress >= 25 && progress < 45,
      },
      {
        title: "In Transit",
        time: currentDelivery.status === "In Transit" ? currentDelivery.eta : "In progress",
        done: progress >= 70 || currentDelivery.status === "Delivered",
        current: currentDelivery.status === "In Transit",
      },
      {
        title: "Delivered",
        time:
          currentDelivery.status === "Delivered"
            ? "Completed successfully"
            : currentDelivery.status === "Cancelled"
            ? "Delivery cancelled"
            : "Pending arrival",
        done: currentDelivery.status === "Delivered",
        current: false,
      },
    ];
  }, [currentDelivery.status, currentDelivery.time, currentDelivery.eta, progressValue]);

  const handleCallDriver = () => {
    if (!currentDelivery.driverPhone) return;
    window.location.href = `tel:${currentDelivery.driverPhone}`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "customer",
      text: chatInput,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "driver",
          text: "Noted. I’ll keep you updated.",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
    }, 700);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setShowSupportModal(false);
    alert("Support request sent successfully.");
  };

  if (!currentDelivery) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f1f5f9] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-xl rounded-[28px] border border-white/70 bg-white/95 p-8 text-center shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-bold text-slate-900">No tracking data found</h2>
          <p className="mt-2 text-sm text-slate-500">
            Please go back to your history page and select a delivery to track.
          </p>
          <button
            onClick={() => navigate("/history")}
            className="mt-5 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Go to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f1f5f9] font-sans text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-block text-sm font-medium text-orange-500 transition hover:text-orange-600"
        >
          ← Back
        </button>

        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-6 py-8 shadow-[0_20px_60px_rgba(249,115,22,0.22)] sm:px-8">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Navigation size={14} />
              Live order monitoring
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Track Delivery
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Order ID: {currentDelivery.id}
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="relative h-[300px] w-full bg-slate-100">
                <iframe
                  title="Live delivery map"
                  src={`https://www.google.com/maps?q=${mapQuery}&z=12&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-3 py-2 shadow-sm ring-1 ring-slate-200">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-orange-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Live Map Tracking
                      </p>
                      <p className="text-xs text-slate-500">
                        Route from pickup to destination
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                    {currentDelivery.status === "Delivered"
                      ? "Delivery completed"
                      : currentDelivery.status === "Cancelled"
                      ? "Booking cancelled"
                      : "Approaching destination"}
                  </span>
                  <span className="text-base font-bold text-orange-500">
                    {arrivalText}
                  </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {currentDelivery.status === "Delivered"
                    ? "The package has been delivered successfully."
                    : currentDelivery.status === "Cancelled"
                    ? "This booking was cancelled and is no longer active."
                    : "Driver is currently on the way to the drop-off point."}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h3 className="mb-5 text-lg font-semibold text-slate-900 sm:text-xl">
                Delivery Route
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-green-500" />
                    <span className="mt-1 h-14 w-[2px] bg-slate-300" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Pickup</h4>
                    <p className="mt-1 text-sm text-slate-600 sm:text-[15px]">
                      {currentDelivery.pickup}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-red-500" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Delivery
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 sm:text-[15px]">
                      {currentDelivery.delivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h3 className="mb-5 text-lg font-semibold text-slate-900 sm:text-xl">
                Delivery Timeline
              </h3>

              <div className="space-y-5">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {item.done ? (
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.current ? "bg-orange-500" : "bg-green-500"
                          }`}
                        >
                          <CheckCircle2 size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-white" />
                      )}

                      {index !== timeline.length - 1 && (
                        <div
                          className={`mt-1 h-14 w-[2px] ${
                            item.done ? "bg-green-500" : "bg-slate-300"
                          }`}
                        />
                      )}
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-semibold sm:text-[15px] ${
                          item.current ? "text-orange-500" : "text-slate-900"
                        }`}
                      >
                        {item.title}{" "}
                        {item.current && <span className="font-medium">(Current)</span>}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h3 className="mb-5 text-lg font-semibold text-slate-900 sm:text-xl">
                Your Driver
              </h3>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-base font-semibold text-orange-500">
                  {driverInitials.toUpperCase()}
                </div>

                <div>
                  <h4 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {currentDelivery.driver || "No driver assigned"}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    ⭐ {currentDelivery.rating || "4.8"} rating
                  </p>
                </div>
              </div>

              <p className="mb-6 flex items-center gap-2 text-sm text-slate-600 sm:text-[15px]">
                {vehicleIcon}
                {currentDelivery.vehicle} • {currentDelivery.packageType}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCallDriver}
                  disabled={!currentDelivery.driverPhone}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Phone size={17} />
                  Call
                </button>

                <button
                  onClick={() => setShowChatModal(true)}
                  disabled={!currentDelivery.driver}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageCircle size={17} />
                  Chat
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 text-center shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Clock3 size={26} className="text-blue-600" />
              </div>

              <p className="text-sm text-slate-600 sm:text-[15px]">
                Estimated Arrival
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-orange-500 sm:text-4xl">
                {arrivalText}
              </h3>

              <div
                className={`mt-5 rounded-2xl py-3 text-sm font-semibold ${
                  currentDelivery.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : currentDelivery.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-green-100/70 text-green-700"
                }`}
              >
                {onTimeLabel}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 sm:text-xl">
                Booking Info
              </h3>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment Method
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {currentDelivery.paymentMethod}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Notes
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {currentDelivery.notes || "No notes provided"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-semibold text-orange-500">
                    {currentDelivery.amount}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 sm:text-xl">
                Need Help?
              </h3>
              <p className="mb-6 text-sm text-slate-600 sm:text-[15px]">
                Contact our support team anytime for delivery concerns.
              </p>

              <button
                onClick={() => setShowSupportModal(true)}
                className="w-full rounded-2xl bg-white py-3 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Get Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-sm font-semibold text-orange-500">
                  {driverInitials.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {currentDelivery.driver}
                  </h3>
                  <p className="text-xs text-slate-500">Delivery chat</p>
                </div>
              </div>

              <button onClick={() => setShowChatModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto bg-slate-50 px-5 py-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "customer" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.sender === "customer"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-slate-800 shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-1 text-[11px] ${
                        msg.sender === "customer"
                          ? "text-orange-100"
                          : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 border-t border-slate-100 px-5 py-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
              />
              <button
                onClick={handleSendMessage}
                className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100">
                  <ShieldAlert size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Contact Support
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tell us what you need help with
                  </p>
                </div>
              </div>

              <button onClick={() => setShowSupportModal(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Order ID
                </label>
                <input
                  type="text"
                  value={currentDelivery.id}
                  readOnly
                  className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Concern
                </label>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white">
                  <option>Late delivery</option>
                  <option>Driver concern</option>
                  <option>Wrong address</option>
                  <option>Package issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your concern..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}