import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { MdDashboard, MdCategory } from 'react-icons/md'
import { FaBox } from "react-icons/fa"
import { FaSignOutAlt } from "react-icons/fa"
import { AuthContext } from '@/context/AuthProvider'
import { FiSliders, } from "react-icons/fi"

function AdminPage() {
  
const {logout}=useContext(AuthContext)
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Card className="rounded-none border-b shadow-sm">
        <nav className="flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Product Management
          </h1>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-semibold">Admin User</p>
              <p className="text-xs text-muted-foreground">
                Administrator
              </p>
            </div>
            <NavLink to="/dashboard/profile" className="hover:text-primary transition" >Profile</NavLink>
          </div>

        </nav>
      </Card>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-64 border-r p-5 h-full">

          <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-2 overflow-y-auto flex-1">
            <NavLink to="/admin" end
              className={({ isActive }) => `px-4 py-2 rounded-lg transition 
              ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>
              <span className='flex p-1 items-center gap-2'><MdDashboard /> Dashboard </span>
            </NavLink>

            <NavLink to="/admin/categories" className={
              ({ isActive }) => `px-4 py-2 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>
              <span className='flex p-1 items-center gap-2'><MdCategory /> Categories </span>
            </NavLink>
            <NavLink to="/admin/attributes" className={
              ({ isActive }) => `px-4 py-2 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}            >
              <span className='flex p-1 items-center gap-2'><FiSliders />Attributes </span>
            </NavLink>
            <NavLink to="/admin/products" className={
              ({ isActive }) => `px-4 py-2 rounded-lg transition ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}            >
              <span className='flex p-1 items-center gap-2'><FaBox /> Products </span>
            </NavLink>
          </nav>
          <div className=" border-t pt-6">
            <Button className="w-full cursor-pointer text-black hover:bg-primary hover:text-white" type="button" variant='outline'
             onClick={logout}>
              <span className='flex p-1 items-center gap-2'><FaSignOutAlt /> Logut </span>
            </Button>
          </div>
        </div>
        <main className="flex-1 p-6 border-t overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminPage