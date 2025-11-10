import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useThemeStore } from "../stores/ThemeStore";

export default function Sidebar() {
  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => setIsLoggedIn(false);

  const linkClasses = `
    block px-4 py-2 rounded-lg transition
    ${
      darkMode
        ? "text-gray-300 hover:bg-darkPrimary/20 hover:text-white"
        : "text-gray-700 hover:bg-primary/10 hover:text-primary"
    }
  `;

  return (
    <div
      className={`
        h-screen w-64 fixed left-0 top-0 py-8 flex flex-col shadow-xl
        ${
          darkMode
            ? "bg-darkSecondary text-darkPrimary"
            : "bg-primary text-secondary"
        }
      `}
    >
      <h1
        className={`
          text-3xl font-bold text-center mb-10
          ${darkMode ? "text-darkSecondary" : "text-primary"}
        `}
      >
        EduStats
      </h1>

      <nav className="flex flex-col gap-2 px-4">

        <NavLink to="/home" className={linkClasses}>
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
        )}

        <NavLink to="/about" className={linkClasses}>
          About Us
        </NavLink>

        <NavLink to="/contact" className={linkClasses}>
          Contact
        </NavLink>

        {/* Auth Buttons */}
        {!isLoggedIn ? (
          <div className="mt-4 flex flex-col gap-2">
            <NavLink
              to="/login"
              className={`
                px-4 py-2 rounded-lg font-semibold transition
                ${
                  darkMode
                    ? "text-darkSecondary hover:bg-darkSecondary/20"
                    : "text-primary hover:bg-primary/10"
                }
              `}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={`
                px-4 py-2 rounded-lg text-white transition
                ${
                  darkMode
                    ? "bg-darkSecondary text-darkSecondary hover:bg-darkSecondary/80"
                    : "bg-primary text-secondary hover:bg-primary/90"
                }
              `}
            >
              Signup
            </NavLink>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`
            mt-6 px-4 py-2 rounded-lg flex items-center gap-2 transition
            ${
              darkMode
                ? "bg-darkSecondary text-darkPrimary hover:bg-darkSecondary/90"
                : "bg-primary text-secondary hover:bg-primary/90"
            }
          `}
        >
          <span className="h-4 w-4 bg-white/80 rounded-full"></span>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </div>
  );
}
