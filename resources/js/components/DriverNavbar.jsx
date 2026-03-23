import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Truck,
  ClipboardList,
  Crosshair,
  History,
  Wallet,
  User,
} from "lucide-react";

export default function DriverNavbar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Deliveries",
      path: "/driver",
      icon: <ClipboardList size={16} strokeWidth={2} />,
      title: "Deliveries",
      subtitle: "View and manage active delivery tasks",
    },
    {
      name: "Track Customer",
      path: "/track",
      icon: <Crosshair size={16} strokeWidth={2} />,
      title: "Track Customer",
      subtitle: "Monitor customer location and contact details",
    },
    {
      name: "History",
      path: "/driver-history",
      icon: <History size={16} strokeWidth={2} />,
      title: "History",
      subtitle: "Review completed and past deliveries",
    },
    {
      name: "Earnings",
      path: "/earnings",
      icon: <Wallet size={16} strokeWidth={2} />,
      title: "Earnings",
      subtitle: "Track your income and delivery payments",
    },
    {
      name: "Profile",
      path: "/driver-profile",
      icon: <User size={16} strokeWidth={2} />,
      title: "Profile",
      subtitle: "Manage your account and personal details",
    },
  ];

  const currentPage =
    navItems.find((item) => item.path === location.pathname) || navItems[0];

  return (
    <header className="w-full border-b border-slate-200 bg-[#f3f4f6]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Link to={currentPage.path} className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <Truck size={20} />
          </div>

          <div className="leading-tight">
            <h1 className="text-[18px] font-bold text-slate-900 sm:text-[20px]">
              {currentPage.title}
            </h1>
            <p className="text-sm text-slate-500">{currentPage.subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="grid grid-cols-5 border-t border-slate-200 bg-white lg:hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-3 text-[11px] font-medium ${
                isActive ? "text-blue-700" : "text-slate-500"
              }`}
            >
              <div
                className={`rounded-full p-2 ${
                  isActive ? "bg-blue-100" : "bg-transparent"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-center leading-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}