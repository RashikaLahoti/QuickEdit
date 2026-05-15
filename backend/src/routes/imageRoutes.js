const express = require("express");
const { editImage, saveToImageKit } = require("../controllers/imageController.js");
const upload = require("../middleware/upload.js");

const router = express.Router();

// Apply edits → return processed image buffer (for preview / download)
router.post("/edit", upload.single("image"), editImage);

// Apply edits → upload processed image to ImageKit → return URL
router.post("/save", upload.single("image"), saveToImageKit);

module.exports = router;