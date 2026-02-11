import React from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ onToggleSidebar, isAuthed = false }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
          aria-label="Open menu"
        >
          <span className="text-xl">☰</span>
        </button>

        {/* Search */}
        <div className="flex-1">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-600" />
          </button>

          {/* Not logged in */}
          {!isAuthed ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="h-10 inline-flex items-center justify-center rounded-full border border-emerald-200 px-4 text-sm font-medium
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
          ) : (
            /* Logged in (optional later) */
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="h-9 w-9 rounded-full bg-slate-200" />
              <div className="text-sm leading-tight">
                <div className="font-semibold">User</div>
                <div className="text-slate-500 text-xs">Customer</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
