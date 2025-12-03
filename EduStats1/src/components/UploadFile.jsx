import * as XLSX from "xlsx";
import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { useResultStore } from "../stores/ResultStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ExcelUpload({ darkMode }) {
  const navigate = useNavigate();
  const setResults = useResultStore((s) => s.setResults);
  const [excelData, setExcelData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Dynamic theme classes
  const bg = darkMode ? "bg-[#1b1f23]" : "bg-white";
  const border = darkMode ? "border-gray-700" : "border-gray-200";
  const tileBg = darkMode ? "bg-green-900/20" : "bg-green-100";
  const tileHover = darkMode ? "hover:bg-green-900/40" : "hover:bg-green-200";
  const tileText = darkMode ? "text-green-300" : "text-green-700";
  const btnBg = darkMode ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700";
  const fileTextColor = darkMode ? "text-gray-300" : "text-gray-600";

  const handleFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploadedFileName(file.name);

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const raw = XLSX.utils.sheet_to_json(worksheet);

    // ⭐ Convert Excel keys → Backend expected keys
    const formatted = raw.map((s) => ({
      name: s.Name || s.name,
      subject: s.Subject || s.subject || "N/A",
      marks: Number(s.Marks || s.marks),
      totalMarks: Number(s.TotalMarks || s.totalMarks || 100),
      remarks: s.Remarks || s.remarks || "",
    }));

    setExcelData(formatted);
    console.log("Formatted Excel Data:", formatted);
  };
};


  const sendToBackend = async () => {
    if (excelData.length === 0) {
      toast.error("Please upload an Excel file first!");
      return;
    }

    const res = await fetch("http://localhost:3000/api/uploadExcel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students: excelData }),
    });

    const result = await res.json();

    if (res.ok) {
      setResults(result);
      toast.success("Data processed successfully!");
      setTimeout(() => navigate("/results"), 800);
    } else {
      toast.error(result.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${bg} w-80 p-6 rounded-2xl shadow-lg border ${border} flex flex-col items-center gap-4`}
      >

        {/* Upload Tile */}
        <label
          htmlFor="excel-upload"
          className={`cursor-pointer w-full py-4 rounded-xl text-center flex flex-col items-center gap-2 transition ${tileBg} ${tileHover} ${tileText}`}
        >
          <CloudUpload size={38} strokeWidth={1.5} />
          <span className="font-medium">Upload Excel File</span>
          <span className="text-xs opacity-70">(xlsx, xls)</span>
        </label>

        <input
          id="excel-upload"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          className="hidden"
        />

        {uploadedFileName && (
          <p className={`text-sm ${fileTextColor} -mt-[6px]`}>
            📄 <span className="font-medium">{uploadedFileName}</span> uploaded
          </p>
        )}

        {/* Process Button */}
        <button
          onClick={sendToBackend}
          className={`w-full text-white py-2 rounded-xl transition font-medium ${btnBg}`}
        >
          Process Data
        </button>
      </div>
    </div>
  );
}

export default ExcelUpload;
