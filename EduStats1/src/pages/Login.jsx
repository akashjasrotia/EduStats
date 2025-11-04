import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Welcome Back</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-all"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-secondary hover:underline">
            Forgot password?
          </a>
        </div>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
