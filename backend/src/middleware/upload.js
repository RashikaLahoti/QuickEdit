const multer = require("multer");

// store image in memory (fast for processing)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;