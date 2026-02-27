"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = getAllJobs;
exports.getJobById = getJobById;
exports.createJob = createJob;
exports.deleteJob = deleteJob;
const prisma_1 = require("../lib/prisma");
// GET /api/jobs
async function getAllJobs(_req, res) {
    try {
        const jobs = await prisma_1.prisma.job.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            success: true,
            data: jobs,
            message: "Jobs retrieved successfully",
        });
    }
    catch {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// GET /api/jobs/:id
async function getJobById(req, res) {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid job ID" });
            return;
        }
        const job = await prisma_1.prisma.job.findUnique({ where: { id } });
        if (!job) {
            res.status(404).json({ success: false, message: "Job not found" });
            return;
        }
        res.status(200).json({
            success: true,
            data: job,
            message: "Job retrieved successfully",
        });
    }
    catch {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// POST /api/jobs
async function createJob(req, res) {
    try {
        const { title, company, location, category, description } = req.body;
        const job = await prisma_1.prisma.job.create({
            data: { title, company, location, category, description },
        });
        res.status(201).json({
            success: true,
            data: job,
            message: "Job created successfully",
        });
    }
    catch {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// DELETE /api/jobs/:id
async function deleteJob(req, res) {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid job ID" });
            return;
        }
        const existing = await prisma_1.prisma.job.findUnique({ where: { id } });
        if (!existing) {
            res.status(404).json({ success: false, message: "Job not found" });
            return;
        }
        await prisma_1.prisma.job.delete({ where: { id } });
        res.status(200).json({
            success: true,
            data: null,
            message: "Job deleted successfully",
        });
    }
    catch {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
