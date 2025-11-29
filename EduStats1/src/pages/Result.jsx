import { useResultStore } from "../stores/ResultStore";
import { useThemeStore } from "../stores/ThemeStore";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

export default function ResultsPage() {
  const results = useResultStore((s) => s.results);
  const darkMode = useThemeStore((s) => s.darkMode);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-semibold mb-4">No results found</h1>
        <button
          onClick={() => navigate("/home/manual")} // Adjusted path for clarity
          className="px-6 py-3 bg-mainBlue text-white rounded-xl text-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { vizName, studentResults, stats } = results;

  const tileBase = `
    rounded-[2rem] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.07)]
    transition-all duration-300
    // Added flex and h-full to make the tiles fill their grid cells
    flex flex-col h-full
    ${darkMode ? "bg-gray-900 text-white border border-gray-700" : "bg-[#F2F4EF] text-gray-800"}
  `;

  // --- Chart Data Definitions (Unchanged) ---
  const barData = {
    labels: studentResults.map((s) => s.name),
    datasets: [
      {
        label: "Marks",
        data: studentResults.map((s) => s.marks),
        backgroundColor: "#B6F8C7",
        borderRadius: 20,
      },
    ],
  };

  const lineData = {
    labels: studentResults.map((s) => s.name),
    datasets: [
      {
        label: "Percentage",
        data: studentResults.map((s) => s.percentage),
        borderColor: "#6B5BFF",
        backgroundColor: "rgba(107, 91, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const gradePie =
    stats?.gradeDistribution &&
    Object.entries(stats.gradeDistribution).reduce(
      (acc, [grade, value]) => {
        acc.labels.push(grade);
        acc.values.push(value);
        return acc;
      },
      { labels: [], values: [] }
    );

  const pieGradeData =
    gradePie && {
      labels: gradePie.labels,
      datasets: [
        {
          data: gradePie.values,
          backgroundColor: ["#B6F8C7", "#BFB4FF", "#FACC15", "#F97316", "#EF4444"],
        },
      ],
    };

  const statsLabels = [];
  const statsValues = [];
  Object.entries(stats).forEach(([k, v]) => {
    if (typeof v !== "object") {
      statsLabels.push(k.replace(/([A-Z])/g, " $1"));
      statsValues.push(v);
    }
  });

  const statsPieData = {
    labels: statsLabels,
    datasets: [
      {
        data: statsValues,
        backgroundColor: ["#B6F8C7", "#BFB4FF", "#6EE7B7", "#FACC15", "#F97316"],
      },
    ],
  };
  // --- End Chart Data Definitions ---


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-mainBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  // ----------------------------------------
  // REFACTORED RETURN/LAYOUT START
  // ----------------------------------------
  return (
  <div
    className={`
      min-h-screen p-10 lg:p-20 transition-all duration-300 
      ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}
    `}
  >
    {/* Header */}
    <header className="mb-10 text-center">
      <h1
        className={`
          text-4xl font-extrabold tracking-tight 
          ${darkMode ? "text-white" : "text-gray-900"}
        `}
      >
        Results Dashboard
      </h1>

      <p
        className={`
          text-2xl font-semibold mt-2 
          ${darkMode ? "text-gray-300" : "text-gray-700"}
        `}
      >
        Visualization: {vizName}
      </p>
    </header>

    {/* --- GRID --- */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

      {/* BAR CHART */}
      <div
        className={`
          ${tileBase}
          md:col-span-2 xl:col-span-1 
          ${darkMode ? "bg-gray-900 text-white" : "bg-[#F2F4EF] text-gray-900"}
        `}
      >
        <h2
          className={`text-xl mb-4 font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Marks Comparison
        </h2>
        <div className="grow flex items-center justify-center">
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* LINE CHART */}
      <div
        className={`
          ${tileBase}
          md:col-span-2 xl:col-span-2
          ${darkMode ? "bg-gray-900 text-white" : "bg-[#F2F4EF] text-gray-900"}
        `}
      >
        <h2
          className={`text-xl mb-4 font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Percentage Trend
        </h2>
        <div className="grow flex items-center justify-center">
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* STATS PIE CHART */}
      <div
        className={`
          ${tileBase}
          md:col-span-1 xl:col-span-2
          ${darkMode ? "bg-gray-900 text-white" : "bg-[#F2F4EF] text-gray-900"}
        `}
      >
        <h2
          className={`text-xl mb-4 font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Stats Breakdown
        </h2>
        <div className="grow flex items-center justify-center h-[25rem]">
          <Pie data={statsPieData} />
        </div>
      </div>
    </div>

    {/* BACK BUTTON */}
    <div className="mt-10 text-center">
      <button
        onClick={() => navigate(-1)}
        className="px-8 py-3 bg-mainBlue text-white rounded-xl text-lg hover:bg-opacity-90 transition-colors"
      >
        ← Go Back
      </button>
    </div>
  </div>
);

}