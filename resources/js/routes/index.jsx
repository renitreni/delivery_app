// resources/js/routes/index.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import CustomerLayout from "../layouts/CustomerLayout";
import RiderLayout from "../layouts/RiderLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";
import AdminLayout from "../layouts/AdminLayout";

// pages (admin)
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminRider from "../pages/admin/Rider";
import AdminRestaurants from "../pages/admin/Restaurants";
import AdminOrders from "../pages/admin/Orders";
import AdminPayouts from "../pages/admin/Payouts";
import AdminSupport from "../pages/admin/Support";
import AdminSettings from "../pages/admin/Settings";

// pages (customer)
import CustomerDashboard from "../pages/customer/Dashboard";
import RestaurantShow from "../pages/customer/Restaurantshow";
import Order from "../pages/customer/Order";
import Messages from "../pages/customer/Messages";
import Profile from "../pages/customer/Profile";
import Addresses from "../pages/customer/Addresses";
import Payment from "../pages/customer/Payment";
import Help from "../pages/customer/Help";

// pages (rider)
import RiderDashboard from "../pages/rider/Dashboard";
import RiderJobs from "../pages/rider/Jobs";
import RiderDelivery from "../pages/rider/Delivery";
import RiderEarnings from "../pages/rider/Earnings";
import RiderMessages from "../pages/rider/Messages";
import RiderProfile from "../pages/rider/Profile";

// pages (restaurant)
import RestaurantDashboard from "../pages/Restaurant/Dashboard";
import RestaurantMenu from "../pages/Restaurant/Menu";
import RestaurantOrders from "../pages/Restaurant/Orders";
import RestaurantPayouts from "../pages/Restaurant/Payouts";
import RestaurantPromos from "../pages/Restaurant/Promos";
import RestaurantReviews from "../pages/Restaurant/Reviews";
import RestaurantSettings from "../pages/Restaurant/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/customer/dashboard" replace /> },

  // ADMIN
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "rider", element: <AdminRider />},
      { path: "restaurants", element: <AdminRestaurants />},
      { path: "orders", element: <AdminOrders />},
      { path: "payouts", element: <AdminPayouts />},
      { path: "support", element: <AdminSupport />},
      { path: "Settings", element: <AdminSettings />},
    ],
  },

  // CUSTOMER
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <CustomerDashboard /> },
      { path: "restaurant/:slug", element: <RestaurantShow /> },
      { path: "order", element: <Order /> },
      { path: "messages", element: <Messages /> },
      { path: "profile", element: <Profile /> },
      { path: "addresses", element: <Addresses /> },
      { path: "payment", element: <Payment /> },
      { path: "help", element: <Help /> },
    ],
  },

  // RIDER
  {
    path: "/rider",
    element: <RiderLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <RiderDashboard /> },
      { path: "jobs", element: <RiderJobs /> },
      { path: "delivery", element: <RiderDelivery /> },
      { path: "earnings", element: <RiderEarnings /> },
      { path: "messages", element: <RiderMessages /> },
      { path: "profile", element: <RiderProfile /> },
    ],
  },

  // RESTAURANT
  {
    path: "/restaurant",
    element: <RestaurantLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <RestaurantDashboard /> },
      { path: "menu", element: <RestaurantMenu /> },
      { path: "orders", element: <RestaurantOrders /> },
      { path: "payouts", element: <RestaurantPayouts /> },
      { path: "promos", element: <RestaurantPromos /> },
      { path: "reviews", element: <RestaurantReviews /> },
      { path: "settings", element: <RestaurantSettings /> },
    ],
  },

  { path: "*", element: <div className="p-8">404</div> },
]);
