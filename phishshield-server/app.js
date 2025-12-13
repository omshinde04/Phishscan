import express from "express";
import cors from "cors";
import scanRoutes from "./routes/scan.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ROUTES
app.use("/api/scan", scanRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("🚀 PhishShield AI Server is Running...");
});

// SERVER START
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
