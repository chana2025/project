import { createBrowserRouter, RouterProvider, Navigate } from "react-router"
import { HomePage } from "../pages/HomePage"
import { ProductsPage } from "../pages/ProductsPage"
import { LoginPage } from "../pages/LoginPage"
import { SignUpPage } from "../pages/SignUpPage"
import { Layout } from "../layouts/Layout"
import { Paths } from "./paths"
import AuthGuard from "../auth/AuthGuard"
import GuestGuard from "../auth/guestGuard"
import { eRole } from "../types/customer.types"
import React from "react"
const Router = () => {
    const router = createBrowserRouter([
        {
            element: <Layout />,
            // element: <AuthGuard ><Layout /></AuthGuard>,
            children: [
                {
                    path: Paths.home,
                    element: <HomePage />
                },
                {
                    path: Paths.products,
                    element: <AuthGuard roles={[eRole.ADMIN]} ><ProductsPage  /></AuthGuard>
                },
            ]
        },
        {
            path: '*',
            element: <h1>404 Not Found</h1>
        },
        {
            path: 'auth',
          //  element: <GuestGuard><AuthPage /></GuestGuard>,
            children: [
                {
                    path: Paths.login,
                    element: <LoginPage />,
                },
                {
                    path: 'sign-up',
                    element: <SignUpPage />,
                }
            ]
        },
        {
            index: true,
            element: <Navigate to='/home' />
        },
    ])

    return <RouterProvider router={router} />
}

export default Router