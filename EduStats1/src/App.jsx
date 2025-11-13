import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ProtectedRoute2 from "./components/ProtectedRoute2";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            <ProtectedRoute2>
              <Login/>
            </ProtectedRoute2>
          } />
          <Route path="/signup" element={
            <ProtectedRoute2>
              <Signup/>
            </ProtectedRoute2>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}