import { NavLink } from "react-router-dom";
import { useThemeStore } from "../stores/ThemeStore";

export default function Home() {
  const darkMode = useThemeStore((s) => s.darkMode);
  const toggleDarkMode = useThemeStore((s) => s.toggleDarkMode);

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center transition
        ${
          darkMode
            ? "bg-linear-to-br from-darkPrimary/20 to-darkSecondary/20 text-gray-100"
            : "bg-linear-to-br from-primary/10 to-secondary/10 text-gray-900"
        }
      `}
    >
      {/* Theme Toggle Button */}
      <div className="w-full max-w-5xl px-6 pt-6 flex justify-end">
        <button
          onClick={toggleDarkMode}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-xl transition
            ${
              darkMode
                ? "bg-darkSecondary text-white hover:bg-darkSecondary/90"
                : "bg-primary text-white hover:bg-primary/90"
            }
          `}
        >
          <span className="h-4 w-4 rounded-full bg-white/90"></span>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mt-6">Home Page</h1>

      {/* Links */}
      <div className="flex gap-4 justify-center mt-4">

        {/* Signup Button */}
        <NavLink
          to="/signup"
          className={`
            px-4 py-2 rounded-lg border transition
            ${
              darkMode
                ? "border-darkSecondary text-darkSecondary hover:bg-darkSecondary/10"
                : "border-secondary text-secondary hover:bg-secondary/10"
            }
          `}
        >
          Signup
        </NavLink>

        {/* Login Button */}
        <NavLink
          to="/login"
          className={`
            px-4 py-2 rounded-lg text-white transition
            ${
              darkMode
                ? "bg-darkPrimary hover:bg-darkPrimary/90"
                : "bg-secondary hover:bg-secondary/90"
            }
          `}
        >
          Login
        </NavLink>

      </div>
    </div>
  );
}
