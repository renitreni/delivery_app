import React, { useMemo, useState } from "react";
import {
  Package,
  MapPin,
  Clock3,
  Zap,
  Bike,
  Truck,
  ShieldCheck,
  CheckCircle2,
  X,
  CreditCard,
  Wallet,
  Smartphone,
  CalendarDays,
  TimerReset,
} from "lucide-react";

export default function Book() {
  const [vehicleType, setVehicleType] = useState("motorcycle");
  const [selectedOption, setSelectedOption] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const [pickup, setPickup] = useState({
    address: "",
    contactName: "",
    phoneNumber: "",
  });

  const [dropoff, setDropoff] = useState({
    address: "",
    recipientName: "",
    phoneNumber: "",
  });

  const [schedule, setSchedule] = useState({
    date: "",
    time: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [packageSize, setPackageSize] = useState("small");

  const deliveryOptions = useMemo(
    () => [
      {
        title: "Standard",
        desc: "Regular same-day delivery",
        eta: "45–60 mins",
        price: "₱80",
        icon: <Package size={18} className="text-orange-500" />,
        accent: "orange",
      },
      {
        title: "Book Now, Deliver Later",
        desc: "Schedule a delivery for later",
        eta: schedule.date && schedule.time ? `${schedule.date} • ${schedule.time}` : "Choose date and time below",
        price: "₱85",
        icon: <CalendarDays size={18} className="text-blue-600" />,
        accent: "blue",
      },
      {
        title: "Prioritize",
        desc: "Faster matching and priority dispatch",
        eta: "25–40 mins",
        price: "₱120",
        icon: <Zap size={18} className="text-red-500" />,
        accent: "red",
      },
    ],
    [schedule.date, schedule.time]
  );

  const selectedPlan = deliveryOptions[selectedOption];

  const summary = useMemo(() => {
    const baseFare = vehicleType === "van" ? 140 : 80;
    const optionExtra =
      selectedPlan.title === "Standard"
        ? 0
        : selectedPlan.title === "Book Now, Deliver Later"
        ? 5
        : 40;

    const sizeExtra =
      packageSize === "small"
        ? 0
        : packageSize === "medium"
        ? 20
        : packageSize === "large"
        ? 45
        : 70;

    const total = baseFare + optionExtra + sizeExtra;

    return {
      baseFare: `₱${baseFare}`,
      optionFee: optionExtra ? `₱${optionExtra}` : "₱0",
      sizeFee: sizeExtra ? `₱${sizeExtra}` : "₱0",
      total: `₱${total}`,
    };
  }, [vehicleType, selectedPlan.title, packageSize]);

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white placeholder:text-slate-400";

  const cardClass =
    "rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]";

  const validateForm = () => {
    const newErrors = {};

    if (!pickup.address.trim()) newErrors.pickupAddress = true;
    if (!pickup.contactName.trim()) newErrors.pickupContactName = true;
    if (!pickup.phoneNumber.trim()) newErrors.pickupPhoneNumber = true;

    if (!dropoff.address.trim()) newErrors.dropoffAddress = true;
    if (!dropoff.recipientName.trim()) newErrors.dropoffRecipientName = true;
    if (!dropoff.phoneNumber.trim()) newErrors.dropoffPhoneNumber = true;

    if (selectedPlan.title === "Book Now, Deliver Later") {
      if (!schedule.date.trim()) newErrors.scheduleDate = true;
      if (!schedule.time.trim()) newErrors.scheduleTime = true;
    }

    if (!paymentMethod.trim()) newErrors.paymentMethod = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenConfirmation = () => {
    if (!validateForm()) return;
    setShowConfirmModal(true);
  };

  const handleFinalBooking = () => {
    setShowConfirmModal(false);
    setBookingSuccess(true);
  };

  const paymentLabel =
    paymentMethod === "cod"
      ? "Cash on Delivery"
      : paymentMethod === "gcash"
      ? "GCash"
      : "Card";

  const planActiveClass = (active, accent) => {
    if (!active) {
      return "border-slate-200 bg-white hover:border-orange-200";
    }

    if (accent === "blue") {
      return "border-blue-500 bg-blue-50";
    }

    if (accent === "red") {
      return "border-red-500 bg-red-50";
    }

    return "border-orange-500 bg-orange-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7f2] via-[#f8fafc] to-[#f1f5f9] pb-24 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-6 py-8 shadow-[0_20px_60px_rgba(249,115,22,0.24)] sm:px-8">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Package size={14} />
              Fast, flexible, and secure booking
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Book a Delivery
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
              Fill in your sender and receiver details, choose your delivery
              option, and confirm your booking in one place.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Pickup */}
            <section className={cardClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <MapPin size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Pickup Location
                  </h2>
                  <p className="text-sm text-slate-500">
                    Enter sender and pickup details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pickup Address
                  </label>
                  <input
                    type="text"
                    value={pickup.address}
                    onChange={(e) =>
                      setPickup({ ...pickup, address: e.target.value })
                    }
                    placeholder="Enter pickup address"
                    className={`${inputClass} ${
                      errors.pickupAddress ? "border-red-400 bg-red-50" : ""
                    }`}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={pickup.contactName}
                      onChange={(e) =>
                        setPickup({ ...pickup, contactName: e.target.value })
                      }
                      placeholder="Juan Dela Cruz"
                      className={`${inputClass} ${
                        errors.pickupContactName
                          ? "border-red-400 bg-red-50"
                          : ""
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={pickup.phoneNumber}
                      onChange={(e) =>
                        setPickup({ ...pickup, phoneNumber: e.target.value })
                      }
                      placeholder="09XX XXX XXXX"
                      className={`${inputClass} ${
                        errors.pickupPhoneNumber
                          ? "border-red-400 bg-red-50"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Drop-off */}
            <section className={cardClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <Package size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Delivery Stop
                  </h2>
                  <p className="text-sm text-slate-500">
                    Enter recipient and drop-off details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={dropoff.address}
                    onChange={(e) =>
                      setDropoff({ ...dropoff, address: e.target.value })
                    }
                    placeholder="Enter delivery address"
                    className={`${inputClass} ${
                      errors.dropoffAddress ? "border-red-400 bg-red-50" : ""
                    }`}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={dropoff.recipientName}
                      onChange={(e) =>
                        setDropoff({
                          ...dropoff,
                          recipientName: e.target.value,
                        })
                      }
                      placeholder="Maria Santos"
                      className={`${inputClass} ${
                        errors.dropoffRecipientName
                          ? "border-red-400 bg-red-50"
                          : ""
                      }`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={dropoff.phoneNumber}
                      onChange={(e) =>
                        setDropoff({
                          ...dropoff,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="09XX XXX XXXX"
                      className={`${inputClass} ${
                        errors.dropoffPhoneNumber
                          ? "border-red-400 bg-red-50"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Vehicle & Package */}
            <section className={cardClass}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <Truck size={20} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Vehicle & Package
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select your vehicle and package size
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Vehicle Type
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setVehicleType("motorcycle")}
                    className={`rounded-2xl border p-4 text-center transition ${
                      vehicleType === "motorcycle"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <Bike size={22} className="mx-auto mb-2 text-orange-500" />
                    <p className="font-medium text-slate-900">Motorcycle</p>
                    <p className="text-sm text-slate-500">Up to 20kg</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleType("van")}
                    className={`rounded-2xl border p-4 text-center transition ${
                      vehicleType === "van"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 bg-white hover:border-orange-200"
                    }`}
                  >
                    <Truck size={22} className="mx-auto mb-2 text-orange-500" />
                    <p className="font-medium text-slate-900">Van</p>
                    <p className="text-sm text-slate-500">Up to 500kg</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Package Size
                </label>
                <select
                  value={packageSize}
                  onChange={(e) => setPackageSize(e.target.value)}
                  className={inputClass}
                >
                  <option value="small">Small (Shoebox size)</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>
            </section>

            {/* Delivery Options */}
            <section className={cardClass}>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Delivery Option
                </h2>
                <p className="text-sm text-slate-500">
                  Pick the best option for this booking
                </p>
              </div>

              <div className="space-y-3">
                {deliveryOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedOption(index)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${planActiveClass(
                      selectedOption === index,
                      option.accent
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70">
                        {option.icon}
                      </div>

                      <div>
                        <p className="text-[15px] font-semibold text-slate-900">
                          {option.title}
                        </p>
                        <p className="text-sm text-slate-500">{option.desc}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          ETA: {option.eta}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg font-bold text-orange-500">
                      {option.price}
                    </p>
                  </button>
                ))}
              </div>

              {selectedPlan.title === "Book Now, Deliver Later" && (
                <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                      <TimerReset size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Schedule Delivery
                      </h3>
                      <p className="text-sm text-slate-500">
                        Choose when you want the package delivered
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Date
                      </label>
                      <input
                        type="date"
                        value={schedule.date}
                        onChange={(e) =>
                          setSchedule({ ...schedule, date: e.target.value })
                        }
                        className={`${inputClass} ${
                          errors.scheduleDate ? "border-red-400 bg-red-50" : ""
                        }`}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Time
                      </label>
                      <input
                        type="time"
                        value={schedule.time}
                        onChange={(e) =>
                          setSchedule({ ...schedule, time: e.target.value })
                        }
                        className={`${inputClass} ${
                          errors.scheduleTime ? "border-red-400 bg-red-50" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className={cardClass}>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Payment Method
                </h2>
                <p className="text-sm text-slate-500">
                  Choose how you want to pay
                </p>
              </div>

              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 bg-white hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet size={18} className="text-green-600" />
                    <div>
                      <p className="font-medium text-slate-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-slate-500">
                        Pay in cash when the item arrives
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 size={18} className="text-orange-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("gcash")}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "gcash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 bg-white hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">GCash</p>
                      <p className="text-sm text-slate-500">
                        Pay using your GCash wallet
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "gcash" && (
                    <CheckCircle2 size={18} className="text-orange-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-orange-500 bg-orange-50"
                      : "border-slate-200 bg-white hover:border-orange-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-violet-600" />
                    <div>
                      <p className="font-medium text-slate-900">Card</p>
                      <p className="text-sm text-slate-500">
                        Pay using debit or credit card
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <CheckCircle2 size={18} className="text-orange-500" />
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <section className="sticky top-24 rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Selected Plan
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedPlan.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedPlan.desc}
                  </p>
                </div>

                {selectedPlan.title === "Book Now, Deliver Later" && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Scheduled Delivery
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {schedule.date && schedule.time
                        ? `${schedule.date} • ${schedule.time}`
                        : "No schedule selected yet"}
                    </p>
                  </div>
                )}

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Pickup
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {pickup.address || "No pickup address yet"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {pickup.contactName || "No contact name"} •{" "}
                    {pickup.phoneNumber || "No phone number"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Delivery
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {dropoff.address || "No delivery address yet"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {dropoff.recipientName || "No recipient name"} •{" "}
                    {dropoff.phoneNumber || "No phone number"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Payment Method
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {paymentLabel}
                  </p>
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Base fare ({vehicleType})</span>
                    <span className="font-medium text-slate-900">
                      {summary.baseFare}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Delivery option fee</span>
                    <span className="font-medium text-slate-900">
                      {summary.optionFee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Package size fee</span>
                    <span className="font-medium text-slate-900">
                      {summary.sizeFee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Estimated arrival</span>
                    <span className="font-medium text-slate-900">
                      {selectedPlan.eta}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {summary.total}
                  </span>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-0.5 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Booking Protection
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Your order will be matched with a nearby verified driver.
                      </p>
                    </div>
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="rounded-2xl bg-green-50 px-4 py-4 text-center">
                    <div className="mb-2 flex justify-center">
                      <CheckCircle2 size={26} className="text-green-600" />
                    </div>
                    <p className="font-semibold text-green-700">
                      Booked Successfully
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Your delivery has been booked.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleOpenConfirmation}
                    className="w-full rounded-2xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Book Delivery
                  </button>
                )}

                <p className="text-center text-sm text-slate-500">
                  Review all details before confirming
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Confirm Booking
                </h3>
                <p className="text-sm text-slate-500">
                  Check if the details are correct before booking
                </p>
              </div>
              <button onClick={() => setShowConfirmModal(false)}>
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Delivery Option
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedPlan.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedPlan.desc}
                </p>
              </div>

              {selectedPlan.title === "Book Now, Deliver Later" && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Scheduled Date & Time
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {schedule.date} • {schedule.time}
                  </p>
                </div>
              )}

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Pickup
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {pickup.address}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {pickup.contactName} • {pickup.phoneNumber}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Delivery
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {dropoff.address}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {dropoff.recipientName} • {dropoff.phoneNumber}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Payment Method
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {paymentLabel}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Notes for driver
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional note..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-4">
                <span className="font-medium text-slate-700">Total</span>
                <span className="text-lg font-bold text-orange-500">
                  {summary.total}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalBooking}
                className="flex-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}