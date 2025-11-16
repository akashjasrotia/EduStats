import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function FileUploadBox({ darkMode }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const openFilePicker = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3 cursor-pointer
        p-8 rounded-2xl border-2 border-dashed transition-all duration-300
        ${dragActive ? "border-mainBlue bg-mainBlue/10" : ""}
        ${darkMode 
          ? "border-gray-600 bg-gray-800 hover:bg-gray-700" 
          : "border-gray-300 bg-white hover:bg-gray-100"}
      `}
      onClick={openFilePicker}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloud size={44} className="text-mainBlue" />

      <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
        Upload Data
      </p>

      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm text-center`}>
        {fileName ? (
          <span className="font-medium text-mainBlue">{fileName}</span>
        ) : (
          "Click or drag a file here to upload"
        )}
      </p>

      <input 
        type="file" 
        id="fileInput" 
        className="hidden" 
        onChange={handleFileSelect}
      />
    </div>
  );
}
