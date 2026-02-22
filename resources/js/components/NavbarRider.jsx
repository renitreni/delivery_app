import React, { useEffect, useRef, useState } from "react";
import { Bell, Search, Menu } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function NavbarRider({ onToggleSidebar = () => {}, user = { name: "Admin User", role: "rider" } }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifBtnRef = useRef(null);
  const notifPanelRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      const hitNotif =
        notifBtnRef.current?.contains(e.target) || notifPanelRef.current?.contains(e.target);
      if (!hitNotif) setNotifOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const name = user?.name || "Rider";
  const role = user?.role || "rider";
  const initials = String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");

  const toggleNotif = () => {
    setNotifOpen((v) => !v);
    setHasUnread(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="h-16 w-full px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50 shrink-0"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4 text-slate-700" />
          </button>

          <div className="flex-1 max-w-xl min-w-0">
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search anything..."
                className="w-full h-10 rounded-2xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
              />
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-3 shrink-0">
          <button
            ref={notifBtnRef}
            type="button"
            onClick={toggleNotif}
            className="relative h-10 w-10 rounded-xl border border-slate-200 bg-white grid place-items-center hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-slate-600" />
            {hasUnread ? (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            ) : null}
          </button>

          {notifOpen ? (
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
                <NotifItem title="New job assigned" desc="Pickup at Burger King." />
                <NotifItem title="Delivery updated" desc="Customer changed address." />
                <NotifItem title="Earnings posted" desc="₱250 added to your wallet." />
              </div>

              <div className="px-4 py-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}

          <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-black">
              {initials || "R"}
            </div>
            <div className="text-left leading-tight">
              <div className="text-sm font-extrabold text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{role}</div>
            </div>
          </div>
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
