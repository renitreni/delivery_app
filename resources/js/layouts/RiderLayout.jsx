import React from "react";
import { Outlet } from "react-router-dom";
import NavbarRider from "../components/NavbarRider";
import SidebarRider from "../components/SidebarRider";

export default function RiderLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <SidebarRider open={sidebarOpen} onClose={closeSidebar} />

      <div className="lg:pl-72">
        <NavbarRider onToggleSidebar={openSidebar} />
        <main className="px-4 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
