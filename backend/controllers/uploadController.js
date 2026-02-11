const multer = require("multer");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

// ================= MULTER CONFIG =================
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/csv" ||
      file.mimetype.includes("spreadsheet") ||
      file.originalname.endsWith(".xlsx")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV and XLSX files allowed"));
    }
  },
});

// ================= DISTRIBUTION LOGIC =================
const distributeTasks = async (items) => {
  const agents = await Agent.find().limit(5);

  if (agents.length < 5) {
    throw new Error("Minimum 5 agents required");
  }

  let agentIndex = 0;

  for (let item of items) {
    await Task.create({
      firstName: item.FirstName,
      phone: item.Phone,
      notes: item.Notes,
      assignedTo: agents[agentIndex]._id,
    });

    agentIndex = (agentIndex + 1) % 5;
  }
};

// ================= UPLOAD CONTROLLER =================
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const items = [];

    // ===== CSV Handling =====
    if (req.file.mimetype === "text/csv") {
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => items.push(row))
          .on("end", resolve)
          .on("error", reject);
      });
    } else {
      // ===== XLSX Handling =====
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      items.push(...data);
    }

    // ===== Validate Columns =====
    if (!items.length || !items[0].FirstName || !items[0].Phone) {
      return res.status(400).json({
        message: "Invalid file format. Required columns: FirstName, Phone, Notes",
      });
    }

    // ===== Distribute =====
    await distributeTasks(items);

    // Remove uploaded file
    fs.unlinkSync(filePath);

    res.json({
      message: "File uploaded and tasks distributed successfully",
      totalItems: items.length,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, uploadFile };
