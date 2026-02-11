import React from "react";
import { createBrowserRouter } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";
import Dashboard from "../pages/customer/Dashboard";  
export const router = createBrowserRouter([
  

  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Dashboard /> },  
    ],
  },
]);
