import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Product from '../Pages/Product'
import UserProfile from '../Pages/UserProfile'
import Cart from '../Pages/Cart'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/products' element={<Product />}/>
        <Route path='/userprofile' element={<UserProfile />}/>
        <Route path='/cart' element={<Cart />}/>
    </Routes>
  )
}

export default AllRoutes