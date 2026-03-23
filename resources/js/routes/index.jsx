import { createBrowserRouter } from "react-router-dom";
import PadalaExpress from "../pages/home/Default";
import Login from "../pages/auth/Login";
import DriverLogin from "../pages/auth/DriverLogin";
import DriverRegister from "../pages/auth/DriverRegister";
import Register from "../pages/auth/Register";

import Customer from "../pages/dashboard/Customer";
import Book from "../pages/dashboard/Book";
import History from "../pages/dashboard/History";
import TrackPackage from "../pages/dashboard/TrackPackage";
import Profile from "../pages/dashboard/Profile";
import Notification from "../pages/dashboard/Notification";

import Driver from "../pages/dashboarddriver/Driver";
import DriverHistory from "../pages/dashboarddriver/DriverHistory";
import DriverProfile from "../pages/dashboarddriver/DriverProfile";
import Earnings from "../pages/dashboarddriver/Earnings";
import Track from "../pages/dashboarddriver/Track";

import DriverLayout from "../layouts/DriverLayout";
import CustomerLayout from "../layouts/CustomerLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PadalaExpress />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/driver-login",
    element: <DriverLogin />,
  },
  {
    path: "/driver-register",
    element: <DriverRegister />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/track-package",
        element: <TrackPackage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },,
    ],
  },

  {
    element: <DriverLayout />,
    children: [
      {
        path: "/driver",
        element: <Driver />,
      },
      {
        path: "/track",
        element: <Track />,
      },
      {
        path: "/driver-history",
        element: <DriverHistory />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },
      {
        path: "/driver-profile",
        element: <DriverProfile />,
      },
    ],
  },
]);

export default router;