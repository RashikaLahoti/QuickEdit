require("dotenv").config();
const express = require("express");
const cors = require("cors");
const imageRoutes = require("./src/routes/imageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "QuickKit Image Editor API is running 🚀" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});