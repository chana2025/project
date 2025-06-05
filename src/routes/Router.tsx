import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { Layout } from "../layouts/Layout";
import { Paths } from "./paths";
import WeeklyTrackingPage from "../pages/WeeklyTrackingPage";

// שמרתי את השורות האלה כאן, אבל לא נשתמש ב־AuthGuard כרגע
// import AuthGuard from "../auth/AuthGuard";
// import GuestGuard from "../auth/guestGuard";
// import { eRole } from "../types/customer.types";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={Paths.home} replace /> },
      { path: Paths.home, element: <HomePage /> },

      // 👇 ביטול זמני של שמירת הרשאות:
      { path: Paths.products, element: <ProductsPage /> },
      { path: Paths.weeklyTracking, element: <WeeklyTrackingPage /> },
    ],
  },
  {
    path: "auth",
    children: [
      { path: Paths.login, element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },
  { path: "*", element: <h1>404 Not Found</h1> },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
