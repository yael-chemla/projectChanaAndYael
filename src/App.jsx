import { Routes, Route } from 'react-router-dom'
import { MyProvider } from "./context/context";
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
import RegisterDetails from "../src/pages/RegisterDetails"
import Home from "../src/pages/Home"
import Todos from "./components/myTodos/Todos"
import Albums from "./components/albums/Albums"
import Info from "../src/components/Info"
import Posts from "./components/myPosts/Posts"
import ProtectedRoute from "./ProtectedRoute"
import Photos from "../src/components/albums/photo/Photos"

import './css/App.css'
function App() {

  return (
    <>
      <MyProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-details" element={<RegisterDetails />} />

          <Route path="/home/users/:id" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}>
            <Route path="todos" element={<Todos />} />
            <Route path="posts" element={<Posts />} />
            <Route path="albums" element={<Albums />}>
              <Route path=":albumId/photos" element={<Photos />} />
            </Route>
          </Route>
        </Routes>
      </MyProvider >

    </>
  )
}

export default App


