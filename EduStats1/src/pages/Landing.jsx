import { NavLink } from "react-router-dom";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";

export default function Landing() {
  const isLoggedIn = useIsLoggedIn((state) => state.isLoggedIn);

  return (
    <div className="min-h-screen font-[Poppins] bg-linear-to-br from-[#F7F8FC] to-[#EEF1F7]">

      <div className="
        w-full h-[12vh] px-10 flex items-center justify-between
        backdrop-blur-xl bg-white/60 shadow-md sticky top-0 z-40
        border-b border-white/40
      ">
        <div className="text-2xl font-bold tracking-tight text-mainBlue">
          EduStats
        </div>

        <div className="hidden md:flex items-center gap-10 text-gray-700 text-[15px] font-medium">
          <NavLink to="/home" className="hover:text-mainBlue transition">Home</NavLink>
          <NavLink to="/visualizations" className="hover:text-mainBlue transition">Visualizations</NavLink>
          <NavLink to="/about" className="hover:text-mainBlue transition">About</NavLink>
          <NavLink to="/contact" className="hover:text-mainBlue transition">Contact</NavLink>
        </div>

        {/* Auth Button */}
        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className="
              bg-mainBlue text-white px-6 py-2.5 rounded-xl 
              shadow-sm hover:bg-mainBlue/90 transition font-medium
            "
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/signup"
            className="
              bg-mainBlue text-white px-6 py-2.5 rounded-xl 
              shadow-sm hover:bg-mainBlue/90 transition font-medium
            "
          >
            Login / Signup
          </NavLink>
        )}
      </div>



      {/* HERO SECTION – Premium Modern UI */}
      <section
        className="-translate-y-[14%]
          w-full h-[88vh] flex justify-center items-center 
          px-6 mt-6
        "
      >
        <div className="
          flex flex-col items-center text-center
        ">
          <h1 className="
            text-5xl md:text-8xl font-bold leading-[1.2] text-gray-900
          ">
            Transform the way you understand{" "}
            <span className="text-mainBlue">education data</span>.
          </h1>

          <p className="text-lg md:text-xl mt-6 text-gray-600">
            Clean, fast, and intelligent visualizations—built for students, teachers,
            and institutions that want clarity at a glance.
          </p>

          <div className="flex gap-4 mt-10">
            <a
              href="/home"
              className="
                py-3.5 px-8 bg-mainBlue text-white rounded-xl
                shadow-md hover:bg-mainBlue/90 transition text-lg font-medium
              "
            >
              Get Started
            </a>

            <a
              href="/contact"
              className="
                py-3.5 px-8 bg-white text-mainBlue rounded-xl
                border border-mainBlue/30 shadow hover:shadow-md transition
                text-lg font-medium
              "
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
