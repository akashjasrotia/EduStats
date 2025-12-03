const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { students, vizName } = req.body;

    // Validate
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ message: "Invalid or missing students data" });
    }

    // Extract marks
    const marksList = students.map((s) => Number(s.marks));

    // Mean
    const mean = marksList.reduce((a, b) => a + b, 0) / marksList.length;

    // Median
    const sorted = [...marksList].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid] + sorted[mid - 1]) / 2
        : sorted[mid];

    // Mode
    const freq = {};
    marksList.forEach((m) => (freq[m] = (freq[m] || 0) + 1));
    const maxFreq = Math.max(...Object.values(freq));
    const mode = Object.keys(freq)
      .filter((k) => freq[k] === maxFreq)
      .map(Number);

    // Highest / Lowest
    const highest = Math.max(...marksList);
    const lowest = Math.min(...marksList);

    // Standard Deviation
    const variance =
      marksList.reduce((a, b) => a + (b - mean) ** 2, 0) / marksList.length;
    const stdDeviation = Math.sqrt(variance);

    // Pass / Fail (>=33 is pass)
    const passCount = marksList.filter((m) => m >= 33).length;
    const failCount = marksList.length - passCount;

    // Per-student results (same format)
    const studentResults = students.map((s) => ({
      name: s.name,
      subject: s.subject || "",
      marks: s.marks,
      totalMarks: s.totalMarks || 100,
      percentage: ((s.marks / (s.totalMarks || 100)) * 100).toFixed(2),
      remarks: s.remarks || "",
    }));

    return res.status(200).json({
      success: true,
      vizName: vizName || "Excel Upload Visualisation",
      totalStudents: students.length,
      stats: {
        mean: mean.toFixed(2),
        median,
        mode,
        highest,
        lowest,
        stdDeviation: stdDeviation.toFixed(2),
        passCount,
        failCount,
      },
      studentResults,
    });

  } catch (err) {
    console.error("Error in /upload-excel:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
