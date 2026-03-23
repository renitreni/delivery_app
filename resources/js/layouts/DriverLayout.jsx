import React from "react";
import { Outlet } from "react-router-dom";
import DriverNavbar from "../components/DriverNavbar";

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <DriverNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}