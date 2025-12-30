import { useState } from 'react'
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import RegisterDetails from "../src/pages/RegisterDetails"
import Posts from "../src/components/Posts"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { MyProvider } from "./context";
import Header from './components/Header'
function App() {

  return (
    <>
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-details" element={<RegisterDetails />} />
            <Route path="/home/users/:id" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>

    </>
  )
}

export default App


