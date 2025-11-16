import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useResultStore } from "../stores/ResultStore";
import { Loader2 } from "lucide-react";

export default function ResultsPage() {
  const { vizName } = useParams();
  const { results, setResults } = useResultStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/results/${vizName}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch results");
        } else {
          setResults(data);
        }
      } catch (err) {
        setError("Server error while fetching results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [vizName, setResults]);

  if (loading) {
    return (
      <div className="ml-12 min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-mainBlue" />
      </div>
    );
  }

  // ❌ Error or not found
  if (error || !results) {
    return (
      <div className="ml-12 p-10">
        <h2 className="text-2xl text-red-500 font-bold">Error</h2>
        <p className="mt-2 text-gray-700">{error || "No results found."}</p>
      </div>
    );
  }

  return (
    <div className="ml-12 p-10 min-h-screen bg-gray-50">

      <h1 className="text-4xl font-bold text-mainBlue mb-10">
        Results for: {vizName}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Mean */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Mean</h2>
          <p className="text-4xl font-bold mt-2">{results.mean}</p>
        </div>

        {/* Median */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Median</h2>
          <p className="text-4xl font-bold mt-2">{results.median}</p>
        </div>

        {/* Standard Deviation */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Std. Deviation</h2>
          <p className="text-4xl font-bold mt-2">{results.stdDeviation}</p>
        </div>

        {/* Highest */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Highest Score</h2>
          <p className="text-4xl font-bold mt-2">{results.max}</p>
        </div>

        {/* Lowest */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Lowest Score</h2>
          <p className="text-4xl font-bold mt-2">{results.min}</p>
        </div>

        {/* Pass Percentage */}
        <div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Pass %</h2>
          <p className="text-4xl font-bold mt-2">{results.passPercentage}%</p>
        </div>

      </div>

      {/* Extra Info */}
      <div className="mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-mainBlue">Additional Insights</h2>

        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-gray-800 text-sm">
          {JSON.stringify(results.additionalInsights, null, 2)}
        </pre>
      </div>
    </div>
  );
}
