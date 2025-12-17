import { useState, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";

export default function AiOverview({ stats, studentResults, darkMode }) {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function convertInsightsArray(insights) {
    if (!insights || insights.length === 0) return [];

    const mainInsights = insights.slice(1);

    return mainInsights.map((item) => {
      const [title, ...rest] = item.split(":");
      return {
        title: title.trim(),
        body: rest.join(":").trim(),
      };
    });
  }

  function extractInsights(text) {
    if (!text) return [];

    let cleaned = text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^[\s\-•]+/gm, "")
      .trim();

    let lines = cleaned.split("\n").map((l) => l.trim());

    if (lines.length <= 1) {
      lines = cleaned
        .split(/(?<=\.)\s+(?=[A-Z])/g)
        .map((l) => l.trim());
    }

    return lines.filter((l) => l.length > 0);
  }

  async function generateInsights() {
    setLoading(true);
    setInsights([]);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "http://localhost",
        },
        body: JSON.stringify({
          model: "google/gemma-3-12b-it:free",
          messages: [
            {
              role: "user",
              content: `Generate 5 actionable insights for these stats: ${JSON.stringify(
                stats
              )} and student results: ${JSON.stringify(
                studentResults
              )}.  
Return each insight on a new line.  
Each line must start with a short title followed by a colon.`,
            },
          ],
        }),
      });

      const data = await res.json();

      let output = "";

      if (data?.choices?.[0]?.message?.content) {
        output = data.choices[0].message.content;
      } else if (Array.isArray(data?.choices?.[0]?.message?.content)) {
        output = data.choices[0].message.content
          .map((c) => c.text || c.content || "")
          .join("\n");
      }

      const extracted = extractInsights(output);
      setInsights(convertInsightsArray(extracted));
    } catch (err) {
      console.error("AI Error:", err);
      setInsights([
        {
          title: "Error",
          body: "Failed to generate insights. Please try again.",
        },
      ]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (open && insights.length === 0 && !loading) {
      generateInsights();
    }
  }, [open]);

  return (
    <>
      {/* MAIN CARD */}
      <div
        className={`p-6 mt-6 rounded-2xl transition ${
          darkMode
            ? "bg-zinc-900 border border-zinc-800 text-white"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-medium">AI Insights</h2>
        </div>

        <p
          className={`mb-4 ${
            darkMode ? "text-zinc-500" : "text-gray-600"
          }`}
        >
          Generate smart, actionable insights based on student performance.
        </p>

        <button
          onClick={() => setOpen(true)}
          className={`px-4 py-2 rounded-xl transition font-medium ${
            darkMode
              ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          }`}
        >
          Generate Insights
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>

          {/* MODAL CARD */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className={`relative w-[92%] max-w-4xl p-8 rounded-3xl ${
              darkMode
                ? "bg-zinc-900 border border-zinc-800 text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800"
            >
              <X />
            </button>

            <h3 className="text-2xl font-medium mb-6">
              AI-Generated Insights
            </h3>

            {/* LOADING */}
            {loading && (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            )}

            {/* RESULTS */}
            {!loading && insights.length > 0 && (
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl ${
                      darkMode
                        ? "bg-zinc-800/60"
                        : "bg-gray-50"
                    }`}
                  >
                    <h4 className="text-lg font-medium text-indigo-400">
                      {insight.title}
                    </h4>
                    <p
                      className={`mt-1 ${
                        darkMode ? "text-zinc-300" : "text-gray-700"
                      }`}
                    >
                      {insight.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
