const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { upload, uploadFile } = require("../controllers/uploadController");

router.post("/upload", protect, upload.single("file"), uploadFile);

module.exports = router;
