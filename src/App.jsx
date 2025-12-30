import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MyProvider } from "./context";
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import RegisterDetails from "../src/pages/RegisterDetails"
import Home from "../src/pages/Home"
import Todos from "../src/components/Todos"
import Albums from "../src/components/Albums"
import Info from "../src/components/Info"
import './App.css'
function App() {

  return (
    <>
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-details" element={<RegisterDetails />} />

            <Route path="/home/users/:id" element={<Home />}>
              <Route path="todos" element={<Todos />} />
              <Route path="albums" element={<Albums />} />
              <Route path="info" element={<Info />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MyProvider >

    </>
  )
}

export default App


