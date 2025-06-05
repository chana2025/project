import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/auth/login">Login</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
