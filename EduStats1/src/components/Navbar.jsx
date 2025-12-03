import { NavLink, useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/ThemeStore";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Menu,
  Home,
  BarChart3,
  Info,
  Phone,
  LogOut,
  LogIn,
  UserPlus,
  Moon,
  Sun,
  Award,
} from "lucide-react";
import { useResultStore } from "../stores/ResultStore";

export default function Sidebar() {
  const clearResults = useResultStore((s) => s.clearResults);
  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const logout = useIsLoggedIn((s) => s.logout);
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        logout();
        clearResults();
        toast.success("Logged out successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message || "Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong while logging out.");
    }
  };

  const textClass = `
    overflow-hidden whitespace-nowrap transition-all duration-200
    ${expanded ? "w-40 ml-3" : "w-0"}
  `;

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-colors duration-200 ` +
    (isActive
      ? darkMode
        ? "bg-mainBlue/30 text-mainBlue font-medium"
        : "bg-mainBlue/10 text-mainBlue font-medium"
      : darkMode
      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
      : "text-gray-700 hover:bg-gray-100 hover:text-black");

  const navItems = [
    { to: "/home", label: "Home", icon: <Home size={20} /> },
    ...(isLoggedIn
      ? [{ to: "/dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> }]
      : []),
    { to: "/about", label: "About", icon: <Info size={20} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
    { to: "/results", label: "Saved Results", icon: <Award size={20} /> },
  ];

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        h-screen flex flex-col shadow-xl select-none
        transition-all duration-300 fixed left-0 top-0 z-50
        overflow-hidden 
        ${expanded ? "w-64" : "w-16"}
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-700"} 
      `}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 px-4 py-4">
        {expanded ? (
          <Menu size={26} />
        ) : (
          <img src="/logo.png" alt="Logo" className="h-7 w-7" />
        )}
        <span
          className={`mt-2 
            overflow-hidden whitespace-nowrap transition-all duration-200
            text-xl tracking-widest font-['steiner']
            ${darkMode ? "text-white" : "text-mainBlue"} 
            ${expanded ? "w-44" : "w-0"}
          `}
        >
          EduStats
        </span>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col mt-4 gap-2 px-2">
        {navItems.map((item, i) => (
          <NavLink key={i} to={item.to} className={getNavLinkClass}>
            {item.icon}
            <span className={textClass}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM SECTION */}
      <div className="mt-auto flex flex-col gap-2 px-2 pb-6">
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className={getNavLinkClass}>
              <LogIn size={20} />
              <span className={textClass}>Login</span>
            </NavLink>

            <NavLink
              to="/signup"
              className={`
                flex items-center p-3 rounded-lg text-white transition-colors duration-200
                bg-mainBlue hover:bg-mainBlue/90
              `}
            >
              <UserPlus size={20} />
              <span className={textClass}>Signup</span>
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg bg-red-700 text-white hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className={textClass}>Logout</span>
          </button>
        )}

        {/* DARK MODE TOGGLE */}
        <button
          onClick={toggleDarkMode}
          className={`
            flex items-center p-3 rounded-lg transition-colors duration-200 w-full
            ${
              darkMode
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-black"
            }
          `}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}

          <span className={textClass}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>

          {expanded && (
            <div
              className={`
                w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ml-auto
                ${darkMode ? "bg-mainBlue" : "bg-gray-300"}
              `}
            >
              <div
                className={`
                  w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200
                  ${darkMode ? "translate-x-5" : "translate-x-0"}
                `}
              ></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
