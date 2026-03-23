import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  History,
  User,
  Bell,
} from "lucide-react";

export default function CustomerNavbar() {
  const location = useLocation();
  const [hasUnread, setHasUnread] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/customer",
      icon: <Home size={16} />,
      headerIcon: <Home size={20} />,
      title: "Customer Dashboard",
      subtitle: "Manage your deliveries and account",
    },
    {
      name: "Book",
      path: "/book",
      icon: <BookOpen size={16} />,
      headerIcon: <BookOpen size={20} />,
      title: "Book Delivery",
      subtitle: "Create and schedule a new delivery",
    },
    {
      name: "History",
      path: "/history",
      icon: <History size={16} />,
      headerIcon: <History size={20} />,
      title: "Delivery History",
      subtitle: "Review your completed deliveries",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={16} />,
      headerIcon: <User size={20} />,
      title: "Profile",
      subtitle: "Manage your account",
    },
  ];

  const currentPage =
    navItems.find((item) => item.path === location.pathname) || {
      headerIcon: <Bell size={20} />,
      title: "Notifications",
      subtitle: "Stay updated with your deliveries",
      path: "/notification",
    };

  useEffect(() => {
    const checkUnread = () => {
      const savedNotifications = JSON.parse(
        localStorage.getItem("customerNotifications") || "[]"
      );

      const unreadExists = savedNotifications.some((item) => item.unread);
      setHasUnread(unreadExists);
    };

    checkUnread();
    window.addEventListener("storage", checkUnread);
    window.addEventListener("notification-updated", checkUnread);

    return () => {
      window.removeEventListener("storage", checkUnread);
      window.removeEventListener("notification-updated", checkUnread);
    };
  }, []);

  return (
    <header className="w-full border-b border-orange-100 bg-[#fff7ed]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link to={currentPage.path} className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
              {currentPage.headerIcon}
            </div>

            <div className="leading-tight">
              <h1 className="text-[18px] font-bold text-slate-900 sm:text-[20px]">
                {currentPage.title}
              </h1>
              <p className="text-sm text-orange-500">
                {currentPage.subtitle}
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <nav className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            to="/notification"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm ring-1 ring-orange-100 transition hover:bg-orange-50"
          >
            <Bell size={20} />
            {hasUnread && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500" />
            )}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 border-t border-orange-100 bg-white lg:hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-3 text-[11px] font-medium ${
                isActive ? "text-orange-600" : "text-slate-500"
              }`}
            >
              <div
                className={`rounded-full p-2 ${
                  isActive ? "bg-orange-100" : "bg-transparent"
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