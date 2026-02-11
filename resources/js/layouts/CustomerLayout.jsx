import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";

export default function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // change later when you implement auth
  const isAuthed = false;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="lg:pl-72">
        <Navbar
          isAuthed={isAuthed}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
