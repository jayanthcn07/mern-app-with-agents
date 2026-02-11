const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addAgent } = require("../controllers/agentController");

router.post("/add", protect, addAgent);

module.exports = router;
