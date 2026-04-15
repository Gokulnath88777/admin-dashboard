import Login from '@/pages/Login'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Register from '@/pages/Register'
import AdminPage from '@/pages/AdminPage'
import UserPage from '@/pages/UserPage'
import Unauthorize from '@/pages/Unauthorize'
import Categories from '@/pages/admin/Categories'

function PageRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/unauthorize' element={<Unauthorize/>}></Route>


      <Route  element={<ProtectedRoutes allowedRoles={['admin']} />}>
        <Route path='/admin' element={<AdminPage />}>
            <Route path='create' element={<Categories/>}> </Route>
        </Route>
      </Route>

      
     <Route element={<ProtectedRoutes allowedRoles={['user']}/>}>
        <Route path='/user' element={<UserPage/>}></Route>
     </Route>
    </Routes>
  )
}

export default PageRoutes