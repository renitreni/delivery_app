import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [loc.pathname]);

  const openLogout = () => setLogoutOpen(true);
  const closeLogout = () => setLogoutOpen(false);

  const handleConfirmLogout = () => {
 
    localStorage.removeItem("token");
    localStorage.removeItem("role");  

    setLogoutOpen(false);

 
    nav("/login"); // change to your real login route
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarAdmin
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={openLogout}
      />

      <div className="lg:pl-72">
        <NavbarAdmin
          onToggleSidebar={() => setSidebarOpen(true)}
          onLogoutClick={openLogout}
          onGoSettings={() => nav("/admin/settings")}
          onGoProfile={() => nav("/admin/profile")}
          onSearch={(q) => {
          
            nav(`/admin/orders?search=${encodeURIComponent(q)}`);
          }}
          onOpenNotification={(n) => {

            if (n?.href) nav(n.href);
          }}
        />

        <main>
          <Outlet />
        </main>
      </div>


      {logoutOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[90] bg-black/40"
            onClick={closeLogout}
            aria-label="Close logout modal"
          />
          <div className="fixed inset-0 z-[100] grid place-items-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100">
                <div className="font-extrabold text-slate-900">Logout</div>
                <div className="text-sm text-slate-600 mt-1">
                  Are you sure you want to logout?
                </div>
              </div>
              <div className="px-5 py-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeLogout}
                  className="rounded-xl px-4 py-2 text-sm font-semibold border border-slate-200 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="rounded-xl px-4 py-2 text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
