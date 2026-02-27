import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "QuickHire API is running" });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
