import { useState } from 'react'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import RegisterDetails from "../src/pages/RegisterDetails"
import Posts from "../src/components/Posts"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-details" element={<RegisterDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
