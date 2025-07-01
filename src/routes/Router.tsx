// src/routers/Router.tsx
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import HomePage1 from "../pages/HomePage1";
import { ProductsPage } from "../pages/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { Layout } from "../layouts/Layout";
import { Paths } from "./paths";
import { PrivateAreaPage } from "../pages/PrivateAreaPage"; // ✅ הוספת האזור האישי
// import {MyAreaPage} from "../pages/MyAreaPage";
import { HomePage } from "../pages/HomePage";
import { WeeklyTrackingPage } from "../pages/WeeklyTrackingPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage1 /> },
      { path: Paths.home, element: <HomePage1 /> },
      { path: Paths.products, element: <ProductsPage /> },
      { path: Paths.weeklyTracking, element: <WeeklyTrackingPage /> },
      { path: Paths.myArea, element: <PrivateAreaPage /> }, // ✅ הוספת נתיב לעמוד האזור האישי
      { path: Paths.graph, element: <HomePage /> },
    
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
