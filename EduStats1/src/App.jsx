import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"
import AboutUs from "./pages/About"
import Navbar from "./components/Navbar"
export default function App() {
  return(
    <BrowserRouter>
      <Toaster 
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: '16px',
        },
      }}
      />
      <Navbar/>
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}