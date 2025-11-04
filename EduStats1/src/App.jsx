import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}