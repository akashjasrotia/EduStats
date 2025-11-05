import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">Home Page</h1>
      <div className="flex gap-4 justify-center mt-4">
        <NavLink to="/signup" className="text-blue-500 hover:underline">
          Signup
        </NavLink>
        <NavLink to="/login" className="text-blue-500 hover:underline">
          Login
        </NavLink>
      </div>
    </div>
  );
}
