const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
console.log("Loading Auth Routes...");
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("THIS IS MY STAYHUB SERVER");
});
console.log("App initialized successfully");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});