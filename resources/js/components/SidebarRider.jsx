import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  MapPin,
  Wallet,
  MessageSquare,
  User,
  LogOut,
  X,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const Item = ({ to, icon: Icon, label, end = false, badge }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      cx(
        "group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-700 hover:bg-slate-100"
      )
    }
  >
    <span className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 group-hover:bg-slate-200">
        <Icon className="h-5 w-5 text-slate-600" />
      </span>
      <span>{label}</span>
    </span>

    {badge ? (
      <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-rose-100 px-2 text-xs font-extrabold text-rose-600">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

export default function SidebarRider({ open, onClose }) {
  const navigate = useNavigate();

  const logout = () => {
   
    navigate("/");
  };

  return (
    <>
      
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-600 text-white font-black">
            R
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900">FoodDelivery</div>
            <div className="text-xs text-slate-500">rider</div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Item to="/rider/dashboard" icon={LayoutGrid} label="Dashboard" end />
          <Item to="/rider/jobs" icon={ClipboardList} label="Jobs" badge="2" />
          <Item to="/rider/delivery" icon={MapPin} label="Delivery" />
          <Item to="/rider/earnings" icon={Wallet} label="Earnings" />
          <Item to="/rider/messages" icon={MessageSquare} label="Messages" />
          <Item to="/rider/profile" icon={User} label="Profile" />
        </nav>

        <div className="px-4 pb-6">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50">
              <LogOut className="h-5 w-5" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

     
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-600 text-white font-black">
              R
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">FoodDelivery</div>
              <div className="text-xs text-slate-500">rider</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 space-y-2" onClick={onClose}>
          <Item to="/rider/dashboard" icon={LayoutGrid} label="Dashboard" end />
          <Item to="/rider/jobs" icon={ClipboardList} label="Jobs" badge="2" />
          <Item to="/rider/delivery" icon={MapPin} label="Delivery" />
          <Item to="/rider/earnings" icon={Wallet} label="Earnings" />
          <Item to="/rider/messages" icon={MessageSquare} label="Messages" />
          <Item to="/rider/profile" icon={User} label="Profile" />
        </nav>

        <div className="px-4 pb-6 mt-4">
          <button
            type="button"
            onClick={() => {
              onClose?.();
              logout();
            }}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50">
              <LogOut className="h-5 w-5" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
