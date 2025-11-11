import { NavLink } from "react-router-dom";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";

export default function Landing() {
  const isLoggedIn = useIsLoggedIn((state) => state.isLoggedIn);

  return (
    <div className="px-6 relative min-h-screen">

      <div className="w-full h-[10vh] px-8 flex items-center justify-between">

        <div className="text-2xl font-bold font-['Poppins']">
          EduStats
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <NavLink to="/home" className="hover:text-primary transition">Home</NavLink>
          <NavLink to="/visualizations" className="hover:text-primary transition">Visualizations</NavLink>
          <NavLink to="/about" className="hover:text-primary transition">About Us</NavLink>
          <NavLink to="/contact" className="hover:text-primary transition">Contact</NavLink>
        </div>

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className="bg-secondary text-white px-5 py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/signup"
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Login / Signup
          </NavLink>
        )}
      </div>
      <div
        className="
          w-full h-[90vh] flex justify-center items-center 
          bg-linear-to-br from-primary/30 to-secondary/40 
          rounded-3xl mt-4
        "
      >
        <div className="flex flex-col justify-center items-center text-center px-4">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Smarter decisions, stronger education. <br />
            <span className="text-gray-500 text-4xl md:text-6xl">
              all in one place
            </span>
          </h1>

          <p className="text-lg md:text-xl mt-4">
            Visualizing educational data efficiently.
          </p>

          <a
            href="/home"
            className="
              mt-8 py-4 px-8 bg-primary text-white rounded-xl
              hover:bg-primary/95 active:translate-y-1
              transition-all duration-300 cursor-pointer
            "
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
