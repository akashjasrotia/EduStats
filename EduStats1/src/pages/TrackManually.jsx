import { useState } from "react";
import { useThemeStore } from "../stores/ThemeStore";
import { useResultStore } from "../stores/ResultStore";
import { useNavigate } from "react-router-dom";

import {
  User,
  FileText,
  Hash,
  BarChart3,
  Send,
  Plus,
  Type,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ManualEntry() {
  const setResults = useResultStore((s) => s.setResults);
  const darkMode = useThemeStore((s) => s.darkMode);
  const navigate = useNavigate();

  const [vizName, setVizName] = useState("");
  const [count, setCount] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputClass = `
    w-full px-4 py-3 rounded-xl border outline-none transition
    ${
      darkMode
        ? "bg-gray-900 border-gray-700 text-white"
        : "bg-white border-gray-300"
    }
    focus:border-mainBlue focus:ring-2 focus:ring-mainBlue/40
  `;

  const createForm = () => {
    if (!vizName.trim()) return toast.error("Enter a visualization name");
    if (!count || count < 1) return toast.error("Enter a valid number");

    const arr = Array.from({ length: Number(count) }, () => ({
      id: crypto.randomUUID(),
      name: "",
      subject: "",
      marks: "",
      totalMarks: "",
      remarks: "",
    }));

    setStudents(arr);
  };

  const handleChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((st) => (st.id === id ? { ...st, [field]: value } : st))
    );
  };

  const handleBack = () => {
    setStudents([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!vizName.trim()) return toast.error("Visualization name is required");
    if (students.some((s) => !s.name || !s.subject || !s.marks))
      return toast.error("Fill all required fields");

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/manual-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vizName, students }),
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data);
        toast.success("Saved!");

        setStudents([]);
        setVizName("");
        setCount("");

        setTimeout(() => {
          navigate(`/results`);
        }, 500);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`
        ml-12 min-h-screen px-6 py-10 flex flex-col items-center
        ${darkMode ? "bg-slate-950" : "bg-gray-50"}
      `}
    >
      {!students.length && (
        <div
          className={`
            w-full max-w-xl p-10 rounded-2xl shadow-xl mb-10 text-center
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          `}
        >
          <h1 className="text-3xl font-bold mb-6">Create New Visualization</h1>

          <div className="relative mb-5">
            <Type className="absolute left-3 top-3 text-mainBlue" />
            <input
              type="text"
              placeholder="Visualization name"
              className={`${inputClass} pl-10`}
              value={vizName}
              onChange={(e) => setVizName(e.target.value)}
            />
          </div>

          <div className="relative mb-5">
            <Plus className="absolute left-3 top-3 text-mainBlue" />
            <input
              type="number"
              placeholder="Number of students"
              className={`${inputClass} pl-10`}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>

          <button
            onClick={createForm}
            className="mt-3 bg-mainBlue text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <Plus size={20} /> Generate Forms
          </button>
        </div>
      )}

      {students.length > 0 && (
        <form
          onSubmit={handleSubmit}
          className={`
            w-full max-w-6xl p-10 rounded-2xl shadow-xl
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          `}
        >
          <div className="flex items-center justify-center relative mb-10">
            <button
              type="button"
              onClick={handleBack}
              className={`absolute left-0 p-2 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold">{vizName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {students.map((s, i) => (
              <div
                key={s.id}
                className={`
                  p-6 rounded-xl border shadow-sm
                  ${
                    darkMode
                      ? "border-gray-700 bg-gray-900/50"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                <h3 className="text-xl font-bold mb-4">Student #{i + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="text"
                        className={`${inputClass} pl-10`}
                        value={s.name}
                        onChange={(e) =>
                          handleChange(s.id, "name", e.target.value)
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Subject</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="text"
                        className={`${inputClass} pl-10`}
                        value={s.subject}
                        onChange={(e) =>
                          handleChange(s.id, "subject", e.target.value)
                        }
                        placeholder="Science"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Marks</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="number"
                        className={`${inputClass} pl-10`}
                        value={s.marks}
                        onChange={(e) =>
                          handleChange(s.id, "marks", e.target.value)
                        }
                        placeholder="85"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Total Marks
                    </label>
                    <div className="relative">
                      <BarChart3 className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="number"
                        className={`${inputClass} pl-10`}
                        value={s.totalMarks}
                        onChange={(e) =>
                          handleChange(s.id, "totalMarks", e.target.value)
                        }
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 font-medium">Remarks</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows="3"
                    value={s.remarks}
                    onChange={(e) =>
                      handleChange(s.id, "remarks", e.target.value)
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 mt-8 bg-mainBlue text-white rounded-xl flex items-center justify-center gap-3 text-lg font-semibold
              ${isLoading ? "bg-mainBlue/60" : "hover:bg-mainBlue/90"}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send size={20} />
                Save Visualization
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
