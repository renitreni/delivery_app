import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu as MenuIcon, Search } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function RestaurantNavbar({
  onToggleSidebar = () => {},
  user = { name: "Burger King", role: "restaurant" },
  routes = { logout: "/" },
}) {
  const navigate = useNavigate();

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

  const name = user?.name || "Burger King";
  const role = user?.role || "restaurant";
  const initials = name
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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100 lg:hidden shrink-0"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
          >
            <MenuIcon className="h-5 w-5 text-slate-700" />
          </button>

          <div className="relative w-full max-w-2xl min-w-0">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full h-10 rounded-2xl border border-slate-200 bg-slate-50 px-11 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200"
              placeholder="Search anything..."
            />
          </div>
        </div>

        <div className="relative flex items-center gap-3 shrink-0">
          <button
            ref={notifBtnRef}
            type="button"
            onClick={toggleNotif}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5 text-slate-700" />
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
                <NotifItem title="Payout processed" desc="Your payout for Oct 1 - Oct 7 was processed." />
                <NotifItem title="Bank details needed" desc="Please update your bank details to avoid delays." />
                <NotifItem title="New review received" desc="You received a 5-star review today." />
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
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-black">
              {initials || "R"}
            </div>

            <div className="text-left leading-tight">
              <div className="text-sm font-extrabold text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{role}</div>
            </div>

            <button
              type="button"
              onClick={() => navigate(routes.logout || "/")}
              className="ml-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
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
