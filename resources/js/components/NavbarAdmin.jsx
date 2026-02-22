import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Menu, Search, X, ChevronRight, ChevronDown } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function NavbarAdmin({
  onToggleSidebar = () => {},
  onSearch,
  onOpenNotification,
  initialNotifs,
  enableAutoSearch = false,
  autoSearchDelay = 350,
  user = { name: "Admin User", role: "admin" },
}) {
  const [query, setQuery] = useState("");
  const [openNotif, setOpenNotif] = useState(false);

  const [notifs, setNotifs] = useState(
    initialNotifs || [
      { id: "n1", title: "New order placed", msg: "ORD-7834 needs assignment.", unread: true, href: "/admin/orders" },
      { id: "n2", title: "Rider documents", msg: "2 riders pending verification.", unread: true, href: "/admin/rider" },
      { id: "n3", title: "Support tickets", msg: "12 open tickets require attention.", unread: true, href: "/admin/support" },
    ]
  );

  const notifBtnRef = useRef(null);
  const notifPanelRef = useRef(null);

  const unreadCount = useMemo(() => notifs.filter((n) => n.unread).length, [notifs]);
  const hasUnread = unreadCount > 0;

  const initials = String(user?.name || "Admin")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");

  useEffect(() => {
    const onOutside = (e) => {
      const hitNotif =
        notifBtnRef.current?.contains(e.target) || notifPanelRef.current?.contains(e.target);
      if (!hitNotif) setOpenNotif(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpenNotif(false);
    };

    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!enableAutoSearch) return;
    const t = setTimeout(() => {
      if (typeof onSearch === "function") onSearch(query.trim());
    }, autoSearchDelay);
    return () => clearTimeout(t);
  }, [query, enableAutoSearch, autoSearchDelay, onSearch]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSearch?.(q);
  };

  const toggleNotif = () => setOpenNotif((v) => !v);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  const clearAll = () => setNotifs([]);

  const clickNotif = (notif) => {
    setNotifs((prev) => prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n)));
    setOpenNotif(false);
    onOpenNotification?.(notif);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="h-16 px-4 lg:px-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>

        <form onSubmit={submitSearch} className="flex-1 min-w-0">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything..."
              className={cx(
                "w-full h-11 rounded-2xl border border-slate-200 bg-slate-50/60",
                "pl-11 pr-10 text-sm font-semibold text-slate-700",
                "focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
              )}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            ) : null}
          </div>
        </form>

        <div className="relative flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              ref={notifBtnRef}
              type="button"
              onClick={toggleNotif}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-50 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-slate-700" />
              {hasUnread ? (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              ) : null}
            </button>

            {openNotif ? (
              <div
                ref={notifPanelRef}
                className={cx(
                  "absolute right-0 mt-2",
                  "w-[92vw] max-w-sm sm:w-[340px]",
                  "rounded-2xl border border-slate-100 bg-white shadow-lg overflow-hidden"
                )}
              >
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="font-extrabold text-slate-900">
                    Notifications
                    {unreadCount > 0 ? (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                        {unreadCount}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="rounded-lg px-2 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                    >
                      Mark all read
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="rounded-lg px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenNotif(false)}
                      className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-50"
                      aria-label="Close notifications"
                    >
                      <X className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[360px] overflow-auto">
                  {notifs.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-500">No notifications</div>
                  ) : (
                    notifs.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => clickNotif(n)}
                        className={cx(
                          "w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50",
                          n.unread && "bg-emerald-50/40"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-extrabold text-slate-900">{n.title}</div>
                          {n.unread ? <span className="h-2 w-2 rounded-full bg-emerald-500" /> : null}
                        </div>
                        <div className="text-sm text-slate-600">{n.msg}</div>
                        <div className="mt-1 text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                          Open <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-right leading-tight">
              <div className="text-sm font-extrabold text-slate-900">{user?.name || "Admin User"}</div>
              <div className="text-xs text-slate-500">{user?.role || "admin"}</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-black">
              {initials || "A"}
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
