import { NavLink } from "react-router-dom";
import { useThemeStore } from "../stores/ThemeStore";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useState } from "react";
import logo from '../../public/logo.png'
import { Menu, Home, BarChart3, Info, Phone, LogOut, LogIn, UserPlus, Moon, Sun } from "lucide-react";

export default function Sidebar() {
  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const logout = useIsLoggedIn((s) => s.logout);

  const handleLogout = () => logout();

  const [expanded, setExpanded] = useState(false);

  const textClass = `
    overflow-hidden whitespace-nowrap transition-all duration-200
    ${expanded ? "w-40 ml-3" : "w-0"}
  `;

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center p-3 rounded-lg transition-colors duration-200 ` +
    (isActive
      ? (darkMode
          ? "bg-indigo-900/60 text-indigo-400 font-medium"
          : "bg-indigo-100 text-indigo-600 font-medium")
      : (darkMode
          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-black")
    );


  const navItems = [
    { to: "/home", label: "Home", icon: <Home size={20} /> },
    ...(isLoggedIn
      ? [{ to: "/dashboard", label: "Dashboard", icon: <BarChart3 size={20} /> }]
      : []),
    { to: "/about", label: "About", icon: <Info size={20} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
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
        ${darkMode ? "bg-slate-950 text-gray-200" : "bg-white text-gray-700"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        {expanded ? (
          <Menu size={26} />
        ) : (
          <img
            src={logo} 
            alt="Logo"
            className="h-7 w-7"
          />
        )}
        <span
          className={`
            overflow-hidden whitespace-nowrap transition-all duration-200
            text-2xl
            ${darkMode ? "text-white" : "text-black"}
            ${expanded ? "w-44" : "w-0"}
          `}
        >
          EduStats
        </span>
      </div>

      <nav className="flex flex-col mt-4 gap-2 px-2">
        {navItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.to}
            className={getNavLinkClass}
          >
            {item.icon}
            <span className={textClass}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2 px-2 pb-6">
        {!isLoggedIn ? (
          <>
            <NavLink
              to="/login"
              className={getNavLinkClass}
            >
              <LogIn size={20} />
              <span className={textClass}>Login</span>
            </NavLink>

            <NavLink
              to="/signup"
              className={`
                flex items-center p-3 rounded-lg text-white transition-colors duration-200
                bg-indigo-600 hover:bg-indigo-700
              `}
            >
              <UserPlus size={20} />
              <span className={textClass}>Signup</span>
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="
              flex items-center p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200
            "
          >
            <LogOut size={20} />
            <span className={textClass}>Logout</span>
          </button>
        )}
        
        <button
          onClick={toggleDarkMode}
          className={`
            flex items-center p-3 rounded-lg transition-colors duration-200
            ${darkMode
              ? "text-gray-300 hover:bg-gray-800 hover:text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-black"
            }
          `}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className={textClass}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </div>
  );
}