import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <>

    <div>AdminPage</div>
    <nav>
    <NavLink to='/admin/create'>Create</NavLink>
    </nav>
    <Outlet/>
    </>
  )
}

export default AdminPage