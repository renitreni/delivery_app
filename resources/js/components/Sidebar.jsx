import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  ClipboardList,
  MessageSquare,
  User,
  MapPin,
  CreditCard,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const Item = ({ to, label, icon: Icon, end = false, badge, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition
       ${
         isActive
           ? "bg-emerald-50 text-emerald-700"
           : "text-slate-700 hover:bg-slate-50"
       }`
    }
  >
    <span className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-slate-500 group-hover:text-slate-700 group-[.active]:text-emerald-700" />
      <span>{label}</span>
    </span>

    {!!badge && badge > 0 ? (
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-extrabold text-white">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

export default function Sidebar({
  open,
  onClose,
  unreadCount = 0,
  clearUnreadMessages,
}) {
  const navigate = useNavigate();


  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleMessagesClick = () => {
    onClose?.();
    clearUnreadMessages?.();
  };

 
  const askLogout = () => {
    onClose?.(); // 
    setLogoutOpen(true);
  };


  const confirmLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLogoutOpen(false);
    navigate("/login"); 
  };

  return (
    <>
      
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-white border-r border-slate-200
        transform transition-transform duration-200 lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold">
              F
            </div>
            <div className="text-base font-extrabold text-slate-900">
              FoodDelivery
            </div>
          </div>
        </div>

        
        <div className="px-4">
          <div className="space-y-1">
            <Item to="/" icon={Home} label="Home" end onClick={onClose} />
            <Item to="/customer/order" icon={ClipboardList} label="Orders" onClick={onClose} />

            <Item
              to="/customer/messages"
              icon={MessageSquare}
              label="Messages"
              badge={unreadCount}
              onClick={handleMessagesClick}
            />

            <Item to="/customer/profile" icon={User} label="Profile" onClick={onClose} />
            <Item to="/customer/addresses" icon={MapPin} label="Addresses" onClick={onClose} />
            <Item to="/customer/payment" icon={CreditCard} label="Payment" onClick={onClose} />
            <Item to="/customer/help" icon={HelpCircle} label="Help" onClick={onClose} />
          </div>
        </div>

       
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
          <div className="px-4 py-4">
            <button
              type="button"
              onClick={askLogout}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {logoutOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setLogoutOpen(false)}
          />

          
          <div className="relative w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">
                You’re about to log out
              </h3>
              <button
                type="button"
                onClick={() => setLogoutOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-50 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="text-sm text-slate-600">
                Are you sure you want to log out of your account?
              </p>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLogoutOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
