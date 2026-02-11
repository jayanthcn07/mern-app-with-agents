const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Get all tasks grouped by agent
router.get("/all", protect, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
