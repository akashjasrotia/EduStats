import { BarChart3, UploadCloud, Eye, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { useThemeStore } from "../stores/ThemeStore";
import { useNavigate } from "react-router-dom";
import ExcelUpload from "../components/UploadFile";

export default function Home() {
  const navigate = useNavigate();
  const darkMode = useThemeStore((s) => s.darkMode);
  const [loading, setLoading] = useState(true);
  const user = useIsLoggedIn((s) => s.user);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-screen ${
          darkMode ? "bg-zinc-950" : "bg-white"
        }`}
      >
        <div className="relative">
          <Loader2
            className={`w-10 h-10 animate-spin ${
              darkMode ? "text-white" : "text-black"
            }`}
          />
          <div
            className={`absolute inset-0 w-10 h-10 rounded-full blur-xl ${
              darkMode ? "bg-white/20" : "bg-black/10"
            }`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-zinc-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1
            className={`text-5xl font-light tracking-tight mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Welcome back,{" "}
            <span className="font-medium">{user?.name || "User"}</span>
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-zinc-500" : "text-gray-500"
            }`}
          >
            Ready to explore your educational insights?
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Track New */}
            <button
              onClick={() => navigate("/home/manual")}
              className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "bg-zinc-900 hover:bg-zinc-900/80"
                  : "bg-white hover:bg-gray-50 shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${
                  darkMode ? "bg-blue-500" : "bg-blue-400"
                }`}
              ></div>

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    darkMode ? "bg-blue-500/10" : "bg-blue-50"
                  }`}
                >
                  <BarChart3
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-medium mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Track New
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-zinc-500" : "text-gray-600"
                  }`}
                >
                  Keep tabs on your learning progress effortlessly
                </p>
              </div>
            </button>

            {/* Upload File */}
            <ExcelUpload />

            {/* View Insights - Full Width */}
            <button
              onClick={() => navigate("/dashboard")}
              className={`group relative overflow-hidden rounded-2xl p-8 text-left sm:col-span-2 transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? "bg-zinc-900 hover:bg-zinc-900/80"
                  : "bg-white hover:bg-gray-50 shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${
                  darkMode ? "bg-amber-500" : "bg-amber-400"
                }`}
              ></div>

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    darkMode ? "bg-amber-500/10" : "bg-amber-50"
                  }`}
                >
                  <Eye
                    className={`w-6 h-6 ${
                      darkMode ? "text-amber-400" : "text-amber-600"
                    }`}
                  />
                </div>
                <h3
                  className={`text-xl font-medium mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  View Insights
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-zinc-500" : "text-gray-600"
                  }`}
                >
                  Visualize metrics and track trends with beautiful charts
                </p>
              </div>
            </button>
          </div>

          {/* Right Column */}
          <div
            className={`relative rounded-2xl overflow-hidden ${
              darkMode ? "bg-zinc-900" : "bg-white shadow-sm"
            }`}
          >
            <div className="h-full min-h-[400px] flex items-center justify-center p-12">
              <div className="text-center space-y-4">
                <div
                  className={`inline-flex p-4 rounded-2xl ${
                    darkMode ? "bg-zinc-800" : "bg-gray-100"
                  }`}
                >
                  <Sparkles
                    className={`w-12 h-12 ${
                      darkMode ? "text-zinc-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <p
                  className={`text-lg ${
                    darkMode ? "text-zinc-500" : "text-gray-500"
                  }`}
                >
                  Your carousel content here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { label: "Total Sessions", value: "24", change: "+12%" },
            { label: "Hours Logged", value: "156", change: "+8%" },
            { label: "Avg. Score", value: "87%", change: "+5%" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 ${
                darkMode ? "bg-zinc-900/50" : "bg-white/50 shadow-sm"
              }`}
            >
              <p
                className={`text-sm mb-1 ${
                  darkMode ? "text-zinc-500" : "text-gray-500"
                }`}
              >
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <h4
                  className={`text-3xl font-light ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {stat.value}
                </h4>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    darkMode
                      ? "bg-green-500/10 text-green-400"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
