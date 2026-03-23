import React, { useRef, useState } from "react";
import {
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Navigation,
  Clock3,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Video,
  Send,
  Paperclip,
  PackageCheck,
  LocateFixed,
  Package,
  BadgeCheck,
  Truck,
  ChevronRight,
} from "lucide-react";

export default function Track() {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [deliveryStage, setDeliveryStage] = useState("pickup");
  const [systemNotice, setSystemNotice] = useState("");
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "customer",
      type: "text",
      text: "Hello po, malapit na po ba kayo?",
      time: "10:18 AM",
    },
    {
      id: 2,
      sender: "driver",
      type: "text",
      text: "Yes po, on the way na po ako.",
      time: "10:19 AM",
    },
    {
      id: 3,
      sender: "customer",
      type: "text",
      text: "Sige po, salamat.",
      time: "10:20 AM",
    },
  ]);

  const customer = {
    name: "Anna Santos",
    phone: "+639171234567",
    displayPhone: "+63 917 123 4567",
    rating: "4.8",
    initials: "AS",
    status: "Active now",
  };

  const sender = {
    name: "Miguel Reyes",
  };

  const delivery = {
    id: "DEL001",
    pickup: "BGC Central Square, Taguig",
    currentLocation: "EDSA Corner Ayala, Makati",
    dropoff: "123 Ayala Avenue, Makati",
    eta: "12 mins",
  };

  const progressValue =
    deliveryStage === "pickup"
      ? 35
      : deliveryStage === "dropoff"
      ? 80
      : 100;

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${delivery.currentLocation} to ${delivery.dropoff}`
  )}&output=embed`;

  const navigateLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    delivery.currentLocation
  )}&destination=${encodeURIComponent(
    delivery.dropoff
  )}&travelmode=driving`;

  const handleCallCustomer = () => {
    window.location.href = `tel:${customer.phone}`;
  };

  const handleOpenMap = () => {
    window.open(navigateLink, "_blank");
  };

  const handleChooseFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    const validFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    const mappedFiles = validFiles.map((file) => ({
      file,
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
      name: file.name,
    }));

    setAttachments((prev) => [...prev, ...mappedFiles]);
  };

  const handleRemoveAttachment = (id) => {
    setAttachments((prev) => {
      const item = prev.find((file) => file.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((file) => file.id !== id);
    });
  };

  const handleCloseModal = () => {
    attachments.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    setAttachments([]);
    setMessageText("");
    setShowMessageModal(false);
  };

  const handleSendMessage = () => {
    const trimmed = messageText.trim();

    if (!trimmed && attachments.length === 0) return;

    const newItems = [];

    if (trimmed) {
      newItems.push({
        id: Date.now(),
        sender: "driver",
        type: "text",
        text: trimmed,
        time: "Just now",
      });
    }

    attachments.forEach((item, index) => {
      newItems.push({
        id: `${Date.now()}-${index}`,
        sender: "driver",
        type: item.type,
        preview: item.preview,
        name: item.name,
        time: "Just now",
      });
    });

    setMessages((prev) => [...prev, ...newItems]);
    setMessageText("");
    setAttachments([]);
  };

  const handlePackageAction = () => {
    if (deliveryStage === "pickup") {
      setDeliveryStage("dropoff");
      setSystemNotice(
        `Notification sent to ${customer.name}: The package has been picked up.`
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "driver",
          type: "text",
          text: "Update: I already picked up your package and I’m now on the way.",
          time: "Just now",
        },
      ]);
      return;
    }

    if (deliveryStage === "dropoff") {
      setDeliveryStage("delivered");
      setSystemNotice(
        `Notification sent to ${sender.name}: The package has been dropped off successfully.`
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "driver",
          type: "text",
          text: "Update: The package has been delivered successfully.",
          time: "Just now",
        },
      ]);
    }
  };

  const actionLabel =
    deliveryStage === "pickup"
      ? "Pick Up Package"
      : deliveryStage === "dropoff"
      ? "Drop Off Package"
      : "Package Delivered";

  const overallStatus =
    deliveryStage === "pickup"
      ? "Waiting for Pickup"
      : deliveryStage === "dropoff"
      ? "In Transit"
      : "Delivered";

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
                <Truck size={16} />
                Active delivery in progress
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Track Delivery
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">
                Manage the customer delivery, update progress, contact the
                customer, and navigate to the destination in one clean screen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">Delivery ID</p>
                <p className="mt-1 text-lg font-bold">{delivery.id}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md">
                <p className="text-xs text-slate-300">ETA</p>
                <p className="mt-1 text-lg font-bold">
                  {deliveryStage === "delivered" ? "0 mins" : delivery.eta}
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-md col-span-2 sm:col-span-1">
                <p className="text-xs text-slate-300">Status</p>
                <p className="mt-1 text-lg font-bold">{overallStatus}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="space-y-6">
            {/* Customer Card */}
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-md">
                    {customer.initials}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {customer.name}
                      </h2>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {customer.status}
                      </span>
                    </div>

                    <p className="mt-1 text-slate-500">{customer.displayPhone}</p>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <Star
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="font-semibold text-slate-900">
                        {customer.rating}
                      </span>
                      <span className="text-slate-500">customer rating</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCallCustomer}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <Phone size={18} />
                    Call Customer
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowMessageModal(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <MessageCircle size={18} />
                    Message Customer
                  </button>
                </div>
              </div>
            </section>

            {/* Progress Card */}
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Delivery Progress
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Update the package status as you move through the trip
                  </p>
                </div>

                <div
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    deliveryStage === "delivered"
                      ? "bg-emerald-100 text-emerald-700"
                      : deliveryStage === "dropoff"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  <BadgeCheck size={16} />
                  {overallStatus}
                </div>
              </div>

              {systemNotice && (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
                  {systemNotice}
                </div>
              )}

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {progressValue}%
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                      <CheckCircle2 size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Pickup Location
                      </h3>
                      <p className="mt-1 text-slate-600">{delivery.pickup}</p>
                      <p className="mt-1 text-sm font-medium text-emerald-600">
                        {deliveryStage === "pickup"
                          ? "Ready for pickup"
                          : "Package picked up"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100">
                      <LocateFixed size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Current Location
                      </h3>
                      <p className="mt-1 text-slate-600">
                        {delivery.currentLocation}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <Clock3 size={15} />
                        ETA:{" "}
                        {deliveryStage === "delivered" ? "0 mins" : delivery.eta}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl ${
                        deliveryStage === "delivered"
                          ? "bg-emerald-100"
                          : deliveryStage === "dropoff"
                          ? "bg-blue-100"
                          : "bg-slate-200"
                      }`}
                    >
                      <MapPin
                        size={20}
                        className={
                          deliveryStage === "delivered"
                            ? "text-emerald-600"
                            : deliveryStage === "dropoff"
                            ? "text-blue-600"
                            : "text-slate-500"
                        }
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Dropoff Location
                      </h3>
                      <p className="mt-1 text-slate-600">{delivery.dropoff}</p>
                      <p
                        className={`mt-1 text-sm font-medium ${
                          deliveryStage === "delivered"
                            ? "text-emerald-600"
                            : deliveryStage === "dropoff"
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {deliveryStage === "pickup"
                          ? "Pending"
                          : deliveryStage === "dropoff"
                          ? "Ready for drop off"
                          : "Delivered"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handlePackageAction}
                    disabled={deliveryStage === "delivered"}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-semibold text-white transition ${
                      deliveryStage === "delivered"
                        ? "cursor-not-allowed bg-slate-400"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:from-blue-700 hover:to-indigo-700"
                    }`}
                  >
                    <PackageCheck size={18} />
                    {actionLabel}
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenMap}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Navigation size={18} />
                    Navigate to Destination
                  </button>
                </div>
              </div>
            </section>

            {/* Delivery Details */}
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                  Delivery Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Quick summary of the current booking
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Delivery ID</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {delivery.id}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Estimated Time</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {deliveryStage === "delivered" ? "Completed" : delivery.eta}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Status</p>
                  <p
                    className={`mt-1 text-lg font-bold ${
                      deliveryStage === "delivered"
                        ? "text-emerald-600"
                        : deliveryStage === "dropoff"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}
                  >
                    {overallStatus}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Live Map</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Real-time route preview
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <MapPin size={20} className="text-blue-600" />
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[26px] ring-1 ring-slate-200">
                <iframe
                  title="Delivery Map"
                  src={mapEmbedSrc}
                  width="100%"
                  height="360"
                  className="border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <p className="font-semibold text-slate-900">
                    Live Tracking Active
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Route shown from current location to the customer destination.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenMap}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open Full Navigation
                <ChevronRight size={16} />
              </button>
            </section>

            <section className="rounded-[30px] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                  <Package size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Driver Reminder</h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-blue-50">
                Update the package stage as soon as pickup or dropoff happens so
                the customer and sender receive the correct delivery notice.
              </p>
            </section>
          </aside>
        </div>
      </main>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm">
          <div className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {customer.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-emerald-600">{customer.status}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-5 py-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "driver" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[78%] flex-col ${
                      msg.sender === "driver" ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.type === "text" && (
                      <div
                        className={`rounded-3xl px-4 py-3 text-sm shadow-sm ${
                          msg.sender === "driver"
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {msg.type === "image" && (
                      <div
                        className={`overflow-hidden rounded-2xl shadow-sm ${
                          msg.sender === "driver"
                            ? "bg-blue-600"
                            : "bg-white ring-1 ring-slate-200"
                        }`}
                      >
                        <img
                          src={msg.preview}
                          alt={msg.name}
                          className="max-h-64 w-full object-cover"
                        />
                      </div>
                    )}

                    {msg.type === "video" && (
                      <div
                        className={`overflow-hidden rounded-2xl shadow-sm ${
                          msg.sender === "driver"
                            ? "bg-blue-600"
                            : "bg-white ring-1 ring-slate-200"
                        }`}
                      >
                        <video
                          src={msg.preview}
                          controls
                          className="max-h-64 w-full object-cover"
                        />
                      </div>
                    )}

                    <span className="mt-1 px-1 text-xs text-slate-400">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {attachments.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Attachments Preview
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {attachments.map((item) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
                      >
                        <div className="relative">
                          {item.type === "image" ? (
                            <img
                              src={item.preview}
                              alt={item.name}
                              className="h-44 w-full object-cover"
                            />
                          ) : (
                            <video
                              src={item.preview}
                              controls
                              className="h-44 w-full object-cover"
                            />
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(item.id)}
                            className="absolute right-3 top-3 rounded-full bg-white p-1.5 text-slate-700 shadow"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="px-4 py-3">
                          <p className="truncate text-sm font-medium text-slate-700">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  <Paperclip size={16} />
                  Attach
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  <ImageIcon size={16} />
                  Photo
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  <Video size={16} />
                  Video
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleChooseFiles}
              />

              <div className="flex items-end gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={1}
                  placeholder="Type a message..."
                  className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}