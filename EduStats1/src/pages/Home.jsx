import { useThemeStore } from "../stores/ThemeStore";
import { BarChart3, UploadCloud, Eye, Loader2 } from "lucide-react";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useEffect, useState } from "react";
import FileUploadBox from "../components/UploadFile";
import VerticalCarousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const user = useIsLoggedIn((s) => s.user);
  const darkMode = useThemeStore((s) => s.darkMode);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const cardBase = `
    flex flex-col items-center justify-center gap-3
    p-8 rounded-2xl border border-transparent
    transition-all duration-300
    hover:scale-[1.02] hover:border-mainBlue/30 cursor-pointer
  `;

  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const bgColor = darkMode ? "bg-gray-800" : "bg-white";


  if (loading) {
    return (
      <div
        className={`
          flex flex-col items-center justify-center min-h-screen
          ${darkMode ? "bg-slate-950 text-white" : "bg-gray-100 text-gray-900"}
        `}
      >
        <Loader2 className="w-12 h-12 animate-spin text-mainBlue" />
      </div>
    );
  }


  return (
    <div
      className={`pt-30 
        ml-12 font-Kanit min-h-screen px-6 py-10 flex flex-col items-center
        transition-colors duration-300
        ${darkMode ? "bg-slate-950 text-gray-100" : "bg-gray-50 text-gray-900"}
      `}
    >

      <div className="w-full max-w-6xl text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Welcome back,{" "}
          <span className="text-mainBlue font-bold">
            {user?.name || "User"}
          </span>{" "}
          👋
        </h1>

        <p
          className={`mt-3 text-base md:text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Ready to explore your educational insights today?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div onClick={()=>navigate('/home/manual')}
            className={`${cardBase} ${
              darkMode
                ? "bg-mainBlue/10 hover:bg-mainBlue/20"
                : "bg-mainBlue/5 hover:bg-mainBlue/10"
            }`}
          >
            <BarChart3 size={44} className="text-mainBlue" />
            <h2 className={`text-lg font-semibold ${textColor}`}>Track New</h2>
            <p
              className={`text-sm text-center ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Keep tabs on your learning progress effortlessly.
            </p>
          </div>

          {/* Upload File */}
          <FileUploadBox darkMode={darkMode} />

          {/* View Insights */}
          <div
            className={`${cardBase} sm:col-span-2 ${
              darkMode
                ? "bg-yellow-500/10 hover:bg-yellow-500/20"
                : "bg-yellow-100/40 hover:bg-yellow-100/60"
            }`}
          >
            <Eye
              size={44}
              className={`${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
            />
            <h2 className={`text-lg font-semibold ${textColor}`}>
              View Insights
            </h2>
            <p
              className={`text-sm text-center ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Visualize metrics and track trends beautifully.
            </p>
          </div>
        </div>

        {/* Right Section – Vertical Carousel */}
        <div
          className={`
            w-full h-full flex justify-center items-center rounded-2xl overflow-hidden
            ${darkMode ? "bg-gray-900" : "bg-white"}
          `}
        >
          <VerticalCarousel />
        </div>
      </div>
    </div>
  );
}
