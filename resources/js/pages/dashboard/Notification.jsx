import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  PackageCheck,
  Truck,
  Wallet,
  Gift,
  BadgeCheck,
  AlertTriangle,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const defaultNotifications = [
  {
    id: 1,
    category: "Deliveries",
    title: "Delivery Completed",
    message: "Your package DEL001 has been delivered successfully to Makati CBD",
    time: "5 minutes ago",
    unread: true,
    type: "green",
    highlighted: true,
  },
  {
    id: 2,
    category: "Deliveries",
    title: "Driver En Route",
    message: "Juan is on the way to pick up your package from SM Mall of Asia",
    time: "15 minutes ago",
    unread: true,
    type: "blue",
    highlighted: true,
  },
  {
    id: 3,
    category: "Payments",
    title: "Payment Successful",
    message: "Your payment of ₱150 via GCash has been processed",
    time: "1 hour ago",
    unread: false,
    type: "greenMoney",
    highlighted: false,
  },
  {
    id: 4,
    category: "Promos",
    title: "Special Offer!",
    message: "Get 20% off your next delivery. Use code SAVE20",
    time: "2 hours ago",
    unread: true,
    type: "orange",
    highlighted: true,
  },
  {
    id: 5,
    category: "Deliveries",
    title: "Booking Confirmed",
    message: "Your delivery DEL002 has been confirmed and driver is being assigned",
    time: "3 hours ago",
    unread: false,
    type: "blueCheck",
    highlighted: false,
  },
  {
    id: 6,
    category: "Deliveries",
    title: "Delivery Delayed",
    message: "Your delivery DEL000 is experiencing a slight delay due to traffic",
    time: "Yesterday",
    unread: false,
    type: "yellow",
    highlighted: false,
  },
  {
    id: 7,
    category: "Promos",
    title: "New Feature!",
    message: "Try our new multi-stop delivery feature for businesses",
    time: "2 days ago",
    unread: false,
    type: "violet",
    highlighted: false,
  },
];

export default function Notification() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);

  const tabs = ["All", "Deliveries", "Payments", "Promos"];

  useEffect(() => {
    const saved = localStorage.getItem("customerNotifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      localStorage.setItem(
        "customerNotifications",
        JSON.stringify(defaultNotifications)
      );
      setNotifications(defaultNotifications);
    }
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(
        "customerNotifications",
        JSON.stringify(notifications)
      );
      window.dispatchEvent(new Event("notification-updated"));
    }
  }, [notifications]);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const filteredNotifications = useMemo(() => {
    if (activeTab === "All") return notifications;
    return notifications.filter((item) => item.category === activeTab);
  }, [activeTab, notifications]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  const handleOpenNotification = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "green":
        return {
          icon: <PackageCheck size={20} className="text-green-600" />,
          bg: "bg-green-100",
        };
      case "blue":
        return {
          icon: <Truck size={20} className="text-blue-600" />,
          bg: "bg-blue-100",
        };
      case "greenMoney":
        return {
          icon: <Wallet size={20} className="text-emerald-600" />,
          bg: "bg-emerald-100",
        };
      case "orange":
        return {
          icon: <Gift size={20} className="text-orange-600" />,
          bg: "bg-orange-100",
        };
      case "blueCheck":
        return {
          icon: <BadgeCheck size={20} className="text-sky-600" />,
          bg: "bg-sky-100",
        };
      case "yellow":
        return {
          icon: <AlertTriangle size={20} className="text-amber-600" />,
          bg: "bg-amber-100",
        };
      case "violet":
        return {
          icon: <Sparkles size={20} className="text-violet-600" />,
          bg: "bg-violet-100",
        };
      default:
        return {
          icon: <Bell size={20} className="text-slate-600" />,
          bg: "bg-slate-100",
        };
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed,_#ffffff,_#f8fafc)] text-slate-900"
    >
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="mb-8 overflow-hidden rounded-[30px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 p-6 text-white shadow-[0_20px_60px_rgba(249,115,22,0.25)] sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Bell size={22} />
                </div>

                <div>
                  <h1 className="text-[26px] font-bold tracking-tight sm:text-[32px]">
                    Notifications
                  </h1>
                  <p className="text-sm text-white/85">
                    Stay updated with your deliveries and account activity
                  </p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {unreadCount} new notification{unreadCount !== 1 ? "s" : ""}
              </div>
            </div>

            <button
              onClick={handleMarkAllAsRead}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-orange-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50"
            >
              Mark all as read
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.12}
          className="mb-8 rounded-3xl border border-slate-200/80 bg-white/90 p-2 shadow-sm backdrop-blur"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <motion.button
                  key={tab}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((item, index) => {
              const iconData = getIcon(item.type);

              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  onClick={() => handleOpenNotification(item.id)}
                  whileHover={{ y: -3 }}
                  className={`group w-full rounded-3xl border p-5 text-left shadow-sm transition sm:p-6 ${
                    item.highlighted
                      ? "border-orange-200 bg-gradient-to-r from-[#fff7ef] to-[#fffaf6]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconData.bg}`}
                      >
                        {iconData.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {item.category}
                          </span>

                          {item.unread && (
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                              New
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-semibold leading-tight text-slate-900 sm:text-[18px]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
                          {item.message}
                        </p>

                        <p className="mt-3 text-sm text-slate-400">{item.time}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      {item.unread && (
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                      )}

                      <ChevronRight
                        size={18}
                        className="text-slate-300 transition group-hover:text-slate-500"
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredNotifications.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <Bell size={26} />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No notifications yet
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You&apos;re all caught up in this section.
            </p>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}