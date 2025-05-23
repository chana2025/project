import { Outlet, NavLink } from 'react-router'
import './style.css'
import { Paths } from '../routes/paths'
import RoleGuard from '../auth/RoleGuard'
import { eRole } from '../types/customer.types'
import { removeSession } from '../auth/auth.utils'
import React from 'react'
export const Layout = () => {
    return <>
        <header><NavBar /><AcountButton /></header>
        {/* // מחזיר את האלמנט שתואם לתת ניתוב הנוכחי */}
        <main><Outlet /></main>
        <footer>React Course</footer>
    </>
}

export const NavBar = () => {
    return <nav>
        <NavLink to={`/${Paths.home}`} end>Home</NavLink>
        <RoleGuard roles={[eRole.ADMIN]}><NavLink to={Paths.products}>Products</NavLink></RoleGuard>
    </nav>
}


export const AcountButton = () => {

    const logout = () => {
        removeSession()
    }

    return <div>
        <button onClick={logout}>logout</button>
    </div>
}