import { useState, useCallback, useMemo } from "react";
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

  // Detect whether form has unsaved edits
  const isFormDirty = useMemo(() => {
    return students.some(
      (s) =>
        s.name.trim() !== "" ||
        s.subject.trim() !== "" ||
        s.marks.toString().trim() !== ""
    );
  }, [students]);

  // Step 1: Generate N forms
  const createForm = useCallback(() => {
    if (!vizName.trim()) return toast.error("Enter a visualization name");
    if (!count || count < 1)
      return toast.error("Enter a valid number of students");

    const arr = Array.from({ length: Number(count) }, () => ({
      id: self.crypto.randomUUID(),
      name: "",
      subject: "",
      marks: "",
      totalMarks: "",
      remarks: "",
    }));

    setStudents(arr);
  }, [vizName, count]);

  // Handle input changes
  const handleChange = useCallback((id, field, value) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  }, []);

  // Back button
  const handleBack = () => {
    setStudents([]);
  };

  // Submit data
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return;

      if (!vizName.trim()) return toast.error("Visualization name is required");
      if (students.some((s) => !s.name || !s.subject || !s.marks)) {
        return toast.error("Fill all required fields");
      }

      setIsLoading(true);

      try {
        const res = await fetch("http://localhost:3000/api/manual-entry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vizName, students }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Data submitted successfully!");

          // Save results globally
          setResults(data);

          const nameToNavigate = vizName;

          // Reset everything
          setStudents([]);
          setVizName("");
          setCount("");

          setTimeout(() => {
            navigate(`/results/${nameToNavigate}`);
          }, 1500);
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      } finally {
        setIsLoading(false);
      }
    },
    [vizName, students, isLoading, navigate, setResults]
  );

  return (
    <div
      className={`
        ml-12 min-h-screen px-6 py-10 flex flex-col items-center
        ${darkMode ? "bg-slate-950" : "bg-gray-50"}
      `}
    >
      {/* Step 1 — Ask user for viz name + number of students */}
      {!students.length && (
        <div
          className={`
            w-full max-w-xl p-10 rounded-2xl shadow-xl mb-10 text-center
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          `}
        >
          <h1 className="text-3xl font-bold mb-6 tracking-tight">
            Create New Visualization
          </h1>

          {/* Visualization Name */}
          <div className="relative mb-5">
            <Type className="absolute left-3 top-3 text-mainBlue" />
            <input
              type="text"
              placeholder="Name of your visualization"
              className={`${inputClass} pl-10`}
              value={vizName}
              onChange={(e) => setVizName(e.target.value)}
            />
          </div>

          {/* Number of Students */}
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
            className="mt-3 bg-mainBlue text-white w-full py-3 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold transition hover:bg-mainBlue/90"
          >
            <Plus size={20} /> Generate Forms
          </button>
        </div>
      )}

      {/* Step 2 — Multiple student forms */}
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
              disabled={isFormDirty}
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full transition
                ${isFormDirty ? "opacity-50 cursor-not-allowed" : ""}
                ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}
              `}
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-3xl font-bold text-center">
              {vizName} — Enter Student Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {students.map((student, i) => (
              <div
                key={student.id}
                className={`
                  p-6 rounded-xl border shadow-sm
                  ${darkMode ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-white"}
                `}
              >
                <h3 className="text-xl font-bold mb-4">Student #{i + 1}</h3>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="text"
                        className={`${inputClass} pl-10`}
                        value={student.name}
                        onChange={(e) =>
                          handleChange(student.id, "name", e.target.value)
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block mb-2 font-medium">Subject</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="text"
                        className={`${inputClass} pl-10`}
                        value={student.subject}
                        onChange={(e) =>
                          handleChange(student.id, "subject", e.target.value)
                        }
                        placeholder="Science"
                      />
                    </div>
                  </div>

                  {/* Marks */}
                  <div>
                    <label className="block mb-2 font-medium">Marks</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="number"
                        className={`${inputClass} pl-10`}
                        value={student.marks}
                        onChange={(e) =>
                          handleChange(student.id, "marks", e.target.value)
                        }
                        placeholder="85"
                      />
                    </div>
                  </div>

                  {/* Total Marks */}
                  <div>
                    <label className="block mb-2 font-medium">Total Marks</label>
                    <div className="relative">
                      <BarChart3 className="absolute left-3 top-3 text-mainBlue" />
                      <input
                        type="number"
                        className={`${inputClass} pl-10`}
                        value={student.totalMarks}
                        onChange={(e) =>
                          handleChange(student.id, "totalMarks", e.target.value)
                        }
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="mt-4">
                  <label className="block mb-2 font-medium">Remarks</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows="3"
                    value={student.remarks}
                    onChange={(e) =>
                      handleChange(student.id, "remarks", e.target.value)
                    }
                    placeholder="Optional remarks"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 mt-8 bg-mainBlue text-white rounded-xl
              flex items-center justify-center gap-3 text-lg font-semibold
              transition duration-200
              ${isLoading ? "bg-mainBlue/60 cursor-not-allowed" : "hover:bg-mainBlue/90"}
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
