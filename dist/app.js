"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const job_routes_1 = __importDefault(require("./routes/job.routes"));
const application_routes_1 = __importDefault(require("./routes/application.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/jobs", job_routes_1.default);
app.use("/api/applications", application_routes_1.default);
// Health check
app.get("/api/health", (_req, res) => {
    res.status(200).json({ success: true, message: "QuickHire API is running" });
});
// 404 fallback
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
exports.default = app;
