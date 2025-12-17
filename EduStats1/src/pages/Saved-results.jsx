import { useThemeStore } from "../stores/ThemeStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { X } from "lucide-react";
import TopThreeLeaderboard from "../components/Leaderboard";
import ChartsSection from "../components/ChartSection";
import StatsSummary from "../components/StatsSummary";
import AiOverview from "../components/AIOverview";
import { useIsLoggedIn } from "../stores/IsLoggedInStore";
import { motion } from "framer-motion";

export default function SavedResultsPage() {
  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const darkMode = useThemeStore((s) => s.darkMode);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const loadSavedViz = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/saved-results/${id}`
        );
        const data = await res.json();
        setResult(data.visualization || null);
      } catch {
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    loadSavedViz();
  }, [id]);

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
      >
        <Loader2
          className={`w-10 h-10 animate-spin ${
            darkMode ? "text-white" : "text-black"
          }`}
        />
      </div>
    );

  if (!result)
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center text-center px-6 ${
          darkMode ? "bg-zinc-950 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <h1 className="text-2xl font-light mb-6">No results found</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className={`px-6 py-3 rounded-xl transition ${
            darkMode
              ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          }`}
        >
          Go Back
        </button>
      </div>
    );

  const { vizName, studentResults, stats } = result;

  return (
    <div
      className={`min-h-screen pt-24 px-6 transition-colors ${
        darkMode ? "bg-zinc-950 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40
        w-[92%] max-w-4xl rounded-2xl px-6 py-4
        backdrop-blur-md transition ${
          darkMode
            ? "bg-zinc-900/70 border border-zinc-800"
            : "bg-white/70 border border-gray-200 shadow-sm"
        }`}
      >
        <div
          className={`flex justify-center gap-10 text-sm font-medium items-center ${
            darkMode ? "text-zinc-300" : "text-gray-600"
          }`}
        >
          <a
            href="#charts-section"
            className="hover:text-indigo-400 transition"
          >
            Charts
          </a>
          <a href="#stats-summary" className="hover:text-indigo-400 transition">
            Stats
          </a>
          <a href="#ai-overview" className="hover:text-indigo-400 transition">
            AI Insights
          </a>

          {/* NEW */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className={`px-4 py-1.5 rounded-lg font-medium transition ${
              darkMode
                ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }`}
          >
            Leaderboard
          </button>
        </div>
      </nav>
      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <p
          className={`text-3xl font-light mb-1 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {vizName}
        </p>
        <p
          className={`text-lg ${darkMode ? "text-zinc-500" : "text-gray-500"}`}
        >
          Total Students · {studentResults.length}
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <section id="charts-section">
          <ChartsSection
            studentResults={studentResults}
            stats={stats}
            darkMode={darkMode}
          />
        </section>

        <section id="stats-summary">
          <StatsSummary stats={stats} darkMode={darkMode} />
        </section>

        <section id="ai-overview">
          <AiOverview
            stats={stats}
            studentResults={studentResults}
            darkMode={darkMode}
          />
        </section>
      </div>

      {/* FOOTER */}
      <div className="mt-14 mb-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className={`px-8 py-3 rounded-xl font-medium transition ${
            darkMode
              ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          ← Go Back
        </button>
      </div>
      {showLeaderboard && (
        <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{ease:"easeInOut"}} exit={{opacity:0,y:-100}} className="fixed inset-0 z-50  flex items-center justify-center">
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLeaderboard(false)}
          ></div>

          {/* MODAL */}
          <div
            className={`relative w-[92%] max-w-4xl rounded-3xl p-6 ${
              darkMode
                ? "bg-zinc-900 border border-zinc-800"
                : "bg-white border border-gray-200 shadow-xl"
            }`}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 hover:text-white transition"
            >
              <X className={darkMode ? "text-white" : "text-black"} />
            </button>

            {/* CONTENT */}
            <TopThreeLeaderboard
              studentResults={studentResults}
              darkMode={darkMode}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
