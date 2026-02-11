import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  ClipboardList,
  MessageSquare,
  User,
  MapPin,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Item = ({ to, icon: Icon, label, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
       ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
    }
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-white border-r border-slate-100
                    transform transition-transform lg:translate-x-0
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
              F
            </div>
            <div className="leading-tight">
              <div className="font-semibold">FoodDelivery</div>
              <div className="text-xs text-slate-500">Customer</div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden h-9 w-9 rounded-xl hover:bg-slate-100"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <Item to="/customer" icon={Home} label="Home" end />
            <Item to="/customer/orders" icon={ClipboardList} label="Orders" />
            <Item to="/customer/messages" icon={MessageSquare} label="Messages" />
            <Item to="/customer/profile" icon={User} label="Profile" />
            <Item to="/customer/address" icon={MapPin} label="Addresses" />
            <Item to="/customer/payments" icon={CreditCard} label="Payments" />
            <Item to="/customer/help" icon={HelpCircle} label="Help" />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition"
              onClick={() => alert("Logout (frontend only)")}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
