import Login from '@/pages/Login'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Register from '@/pages/Register'
import UserPage from '@/pages/UserPage'
import Unauthorize from '@/pages/Unauthorize'
import Admindashboard from '@/pages/admin/Admindashboard'
import Categories from '@/pages/admin/Categories/Categories'
import AttributeValue from '@/pages/admin/Attributes/AttributeValue/AttributeValue'
import AdminPage from '@/pages/admin/AdminPage'
import AttributePage from '@/pages/admin/Attributes/AttributeComponents/AttributePage'
import CreateProduct from '@/pages/admin/Product/CreateProduct'
import Product from '@/pages/admin/Product/Product'
import CreateVariant from '@/pages/admin/Product/CreateVariant'

function PageRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/unauthorize' element={<Unauthorize/>}></Route>


      <Route  element={<ProtectedRoutes allowedRoles={['admin']} />}>
        <Route path='/admin' element={<AdminPage />}>
            <Route element={<Admindashboard/>} index></Route>
            <Route path='categories' element={<Categories/>}> </Route>
            <Route path='attributes' element={<AttributePage/>}></Route>
            <Route path='attributes/attributeValue/:id' element={<AttributeValue/>}></Route>
            <Route path='products' element={<CreateProduct></CreateProduct>}></Route>
            <Route path='products/viewProduct'element={<Product></Product>}></Route>
            <Route path='products/createVariant/:id' element={<CreateVariant/>}></Route>
        </Route>
      </Route>      
     <Route element={<ProtectedRoutes allowedRoles={['user']}/>}>
        <Route path='/user' element={<UserPage/>}></Route>
     </Route>
    </Routes>
  )
}

export default PageRoutes