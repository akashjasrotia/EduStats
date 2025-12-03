import { useResultStore } from "../stores/ResultStore";
import { useThemeStore } from "../stores/ThemeStore";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
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
        <h1 className="text-2xl text-white font-semibold mb-4">No saved results found</h1>
        <button
          onClick={() => navigate("/home")}
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
    transition-all duration-300 flex flex-col h-full
    ${darkMode ? "bg-gray-900 text-white border border-gray-700" : "bg-[#F2F4EF] text-gray-800"}
  `;

  // --- Chart Data ---
  const barData = {
    labels: studentResults.map((s) => s.name),
    datasets: [
      {
        label: "Marks",
        data: studentResults.map((s) => s.marks),
        backgroundColor: "#6D54B5",
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-mainBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
          className={`text-4xl font-extrabold tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Results Dashboard
        </h1>

        <p
          className={`text-2xl font-semibold mt-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Visualization: {vizName}
        </p>
        <p className="text-3xl font-bold mt-1 text-mainBlue">
          Total Students: {studentResults.length}
        </p>
      </header>

      {/* --- GRID --- */}
      <div className="flex flex-col gap-10">

        {/* BAR CHART */}
        <div className={`${tileBase}`}>
          <h2
            className={`text-xl mb-4 font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Marks Comparison
          </h2>

          {/* FIXED RESPONSIVE WRAPPER */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[350px] h-[350px]">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* LINE CHART */}
        <div className={`${tileBase}`}>
          <h2
            className={`text-xl mb-4 font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Percentage Trend
          </h2>

          {/* FIXED RESPONSIVE WRAPPER */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[350px] h-[350px]">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
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
