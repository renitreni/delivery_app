import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Bike,
  Store,
  ClipboardList,
  Wallet,
  LifeBuoy,
  Settings,
  LogOut,
  X,
  AlertTriangle,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const Item = ({ to, icon: Icon, label, end, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      cx(
        "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
        isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"
      )
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={cx(
            "grid h-9 w-9 place-items-center rounded-xl border transition",
            isActive ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100"
          )}
        >
          <Icon className={cx("h-5 w-5", isActive ? "text-emerald-700" : "text-slate-500")} />
        </span>
        <span>{label}</span>
      </>
    )}
  </NavLink>
);

function LogoutModal({ open, onClose, onConfirm }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      
      <button
        type="button"
        aria-label="Close logout modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      
      <div className="relative mx-auto mt-28 w-[92vw] max-w-md">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">Confirm logout</div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-50"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">You’re about to logout</div>
                <div className="mt-1 text-xs text-slate-600">
                  Are you sure you want to end this session?
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SidebarAdmin({ open, onClose, onLogout }) {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const closeIfMobile = () => {
    if (window.innerWidth < 1024) onClose?.();
  };

  const confirmLogout = () => {
    setLogoutOpen(false);
    closeIfMobile();
    onLogout?.();
  };

  return (
    <>
      
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={cx(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white border-r border-slate-100",
          "flex flex-col",
          "transition-transform duration-200",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        
        <div className="px-5 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-white font-extrabold">
            F
          </div>

          <div className="leading-tight">
            <div className="font-extrabold text-slate-900">FoodDelivery</div>
            <div className="text-xs text-slate-500">admin</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto lg:hidden grid h-9 w-9 place-items-center rounded-xl hover:bg-slate-50"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        
        <div className="flex-1 overflow-auto p-4">
          <nav className="space-y-2">
            <Item to="/admin/dashboard" icon={LayoutGrid} label="Overview" end onClick={closeIfMobile} />
            <Item to="/admin/users" icon={Users} label="Users" onClick={closeIfMobile} />
            <Item to="/admin/rider" icon={Bike} label="Rider" onClick={closeIfMobile} />
            <Item to="/admin/restaurants" icon={Store} label="Restaurants" onClick={closeIfMobile} />
            <Item to="/admin/orders" icon={ClipboardList} label="Orders" onClick={closeIfMobile} />
            <Item to="/admin/payouts" icon={Wallet} label="Payouts" onClick={closeIfMobile} />

            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <Item to="/admin/support" icon={LifeBuoy} label="Support" onClick={closeIfMobile} />
              <Item to="/admin/settings" icon={Settings} label="Settings" onClick={closeIfMobile} />

              
              <button
                type="button"
                onClick={() => setLogoutOpen(true)}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white border border-rose-100">
                  <LogOut className="h-5 w-5" />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}
