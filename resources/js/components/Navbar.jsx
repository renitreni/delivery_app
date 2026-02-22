import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Navbar({ onToggleSidebar = () => {}, isAuthed = true, user }) {
  const [openNotif, setOpenNotif] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifBtnRef = useRef(null);
  const notifPanelRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      const hitNotif =
        notifBtnRef.current?.contains(e.target) || notifPanelRef.current?.contains(e.target);
      if (!hitNotif) setOpenNotif(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const toggleNotif = () => {
    setOpenNotif((v) => !v);
    setHasUnread(false);
  };

  const name = user?.name || "Burger King";
  const role = user?.role || "restaurant";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="h-16 px-3 sm:px-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 shrink-0"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-10 rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
            />
          </div>
        </div>

        <div className="relative flex items-center gap-2 shrink-0">
          <button
            ref={notifBtnRef}
            type="button"
            onClick={toggleNotif}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            {hasUnread && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {openNotif && (
            <div
              ref={notifPanelRef}
              className={cx(
                "absolute right-0 top-12",
                "w-[92vw] max-w-sm sm:w-80",
                "rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
              )}
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-extrabold text-slate-900">Notifications</p>
                <p className="text-xs text-slate-500">Latest updates</p>
              </div>

              <div className="max-h-72 overflow-auto">
                <NotifItem title="Order #1234 shipped" desc="Your order is on the way." />
                <NotifItem title="Promo available 🎉" desc="Get 10% off on your next order." />
                <NotifItem title="Payment saved" desc="Your new card was added successfully." />
              </div>

              <div className="px-4 py-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpenNotif(false)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {isAuthed ? (
            <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 font-black text-xs">
                {initials || "U"}
              </div>

              <div className="text-left leading-tight">
                <div className="text-sm font-extrabold text-slate-900">{name}</div>
                <div className="text-xs text-slate-500">{role}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="h-10 inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-semibold
                           text-emerald-700 hover:bg-emerald-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="h-10 inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 text-sm font-semibold
                           text-white hover:bg-emerald-600 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NotifItem({ title, desc }) {
  return (
    <div className="px-4 py-3 hover:bg-slate-50 transition">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );
}
