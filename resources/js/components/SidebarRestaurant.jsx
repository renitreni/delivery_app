import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ClipboardList,
  UtensilsCrossed,
  Tag, 
  Star, 
  Wallet, 
  Settings,
  LogOut,
  X,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const NavItem = ({ to, icon: Icon, label, badge, end = false, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      cx(
        "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
        isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
      )
    }
  >
    <span className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-[.active]:text-emerald-700" />
      <span className="truncate">{label}</span>
    </span>

    {badge ? (
      <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-rose-500 px-1.5 text-[11px] font-extrabold text-white">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

export default function SidebarRestaurant({ open = false, onClose = () => {} }) {
  const navigate = useNavigate();

 
  const badges = {
    orders: 5,
  };

  const closeMobile = () => onClose?.();

  const Brand = () => (
    <div className="flex items-center gap-3 px-6 py-6">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white font-extrabold">
        F
      </div>
      <div className="leading-tight">
        <div className="text-sm font-extrabold text-slate-900">FoodDelivery</div>
        <div className="text-xs text-slate-500">restaurant</div>
      </div>
    </div>
  );

  const MenuList = ({ onItemClick }) => (
    <nav className="px-4">
      <div className="space-y-1">
        <NavItem to="/restaurant/dashboard" icon={LayoutGrid} label="Dashboard" end onClick={onItemClick} />
        <NavItem to="/restaurant/orders" icon={ClipboardList} label="Orders" badge={badges.orders} onClick={onItemClick} />
        <NavItem to="/restaurant/menu" icon={UtensilsCrossed} label="Menu" onClick={onItemClick} />
        <NavItem to="/restaurant/promos" icon={Tag} label="Promos" onClick={onItemClick} />
        <NavItem to="/restaurant/reviews" icon={Star} label="Reviews" onClick={onItemClick} />
        <NavItem to="/restaurant/payouts" icon={Wallet} label="Payouts" onClick={onItemClick} />
        <NavItem to="/restaurant/settings" icon={Settings} label="Settings" onClick={onItemClick} />
      </div>
    </nav>
  );

  const LogoutBtn = ({ isMobile = false }) => (
    <div className={cx("px-6", isMobile ? "pb-6" : "pb-8")}>
      <button
        type="button"
        onClick={() => {
          if (isMobile) closeMobile();
          navigate("/");
        }}
        className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-rose-600 hover:text-rose-700"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-50">
          <LogOut className="h-5 w-5" />
        </span>
        Logout
      </button>
    </div>
  );

  return (
    <>
      
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <Brand />
        <MenuList />
        <div className="mt-auto border-t border-slate-100">
          <LogoutBtn />
        </div>
      </aside>

      
      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between pr-3">
          <Brand />
          <button
            type="button"
            onClick={closeMobile}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <MenuList onItemClick={closeMobile} />

        <div className="mt-auto border-t border-slate-100">
          <LogoutBtn isMobile />
        </div>
      </aside>
    </>
  );
}
