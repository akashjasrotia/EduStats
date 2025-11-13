import { useThemeStore } from "../stores/ThemeStore";
import { BarChart3, UploadCloud, Eye } from "lucide-react";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useEffect } from "react";
export default function Home() {
  const user = useIsLoggedIn((s)=>s.user);
  const darkMode = useThemeStore((s) => s.darkMode);
  useEffect(()=>{
    console.log(user);
  })
  const cardBase = `
    flex flex-col items-center justify-center gap-3
    p-6 rounded-2xl shadow-lg cursor-pointer
    transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl
  `;

  const textColor = darkMode ? "text-white" : "text-gray-800";
  const bgColor = darkMode ? "bg-gray-800" : "bg-gray-50";

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center pt-10 px-6
        transition-colors duration-300
        ${darkMode ? "bg-slate-950" : "bg-gray-100"}
      `}
    >
      <h1
        className={`
          text-4xl md:text-5xl font-bold mb-10
          ${darkMode ? "text-white" : "text-gray-900"}
        `}
      >
        Hi, {user?.name}
      </h1>

      <div
        className={`
          grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl
        `}
      >
        <div
          className={`
            ${cardBase}
            ${darkMode ? "bg-mainBlue/20 hover:bg-mainBlue/30" : "bg-mainBlue/10 hover:bg-mainBlue/20"}
          `}
        >
          <BarChart3 size={48} className={`${darkMode ? "text-mainBlue" : "text-mainBlue"}`} />
          <h2 className={`text-xl font-semibold ${textColor}`}>Track New</h2>
          <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Monitor your educational metrics in real-time.
          </p>
        </div>

        <div
          className={`
            ${cardBase}
            ${bgColor} hover:bg-mainBlue/10
          `}
        >
          <UploadCloud size={48} className={`${darkMode ? "text-mainBlue" : "text-mainBlue"}`} />
          <h2 className={`text-xl font-semibold ${textColor}`}>Upload Data</h2>
          <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Import datasets to generate visual insights instantly.
          </p>
        </div>
        <div
          className={`
            ${cardBase}
            ${darkMode ? "bg-yellow-500/20 hover:bg-yellow-500/30" : "bg-yellow-100 hover:bg-yellow-200"}
          `}
        >
          <Eye size={48} className={`${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
          <h2 className={`text-xl font-semibold ${textColor}`}>View Insights</h2>
          <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            Analyze performance and visualize trends with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
