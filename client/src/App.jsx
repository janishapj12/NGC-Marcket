import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Dashbord from './pages/Dashbord'
import DetailUser from './pages/DetailUser'




function App() {
  return (
    <div>
      <ToastContainer/>
          <Routes>
            <Route path='/' element = {<Home/>} />
            <Route path='/login' element = {<Login/>} />
            <Route path="/product" element={<Product />} />
            <Route path="/Dashbord" element={<Dashbord />} />
            <Route path="/profile/:id" element={<DetailUser />} />
           
          </Routes>
    </div>
  )
}

export default App