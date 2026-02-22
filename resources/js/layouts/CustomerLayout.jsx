import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // change later when you implement auth
  const isAuthed = true;

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


      <Sidebar open={sidebarOpen} onClose={closeSidebar} />


      <div className="min-h-screen lg:pl-72">
        <Navbar
          onToggleSidebar={openSidebar}
          isAuthed={isAuthed}
          user={{ name: "Keith Pelonio", role: "customer" }}
        />


        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
