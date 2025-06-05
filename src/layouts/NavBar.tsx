import React from 'react';
import { NavLink } from 'react-router-dom';
import RoleGuard from '../auth/RoleGuard';
import { eRole } from '../types/customer.types';
import { removeSession } from '../auth/auth.utils';
import './style.css'; // חשוב שיהיה כאן עיצוב

export const NavBar = () => {
  const logout = () => {
    removeSession();
  };

  return (
    <nav className="navbar">
      <div className="left-links">
        <NavLink to="/home" className="nav-item">Home</NavLink>
        <RoleGuard roles={[eRole.ADMIN]}>
          <NavLink to="/products" className="nav-item">Products</NavLink>
        </RoleGuard>
      </div>
      <div className="right-links">
        <button onClick={logout} className="nav-item">Logout</button>
      </div>
    </nav>
  );
};
