import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarRestaurant from "../components/SidebarRestaurant";
import NavbarRestaurant from "../components/NavbarRestaurant";

export default function RestaurantLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const p = location.pathname;


    if (/(\/dashboard){2,}/.test(p)) {
      navigate("/restaurant/dashboard", { replace: true });
      return;
    }


    if (p.startsWith("/restaurant/orders/") && p.includes("/dashboard")) {
      navigate("/restaurant/dashboard", { replace: true });
      return;
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      <div className="flex min-h-screen">
        <SidebarRestaurant open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 lg:pl-72">
          <NavbarRestaurant onToggleSidebar={() => setSidebarOpen(true)} />

          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
