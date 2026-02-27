"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplication = createApplication;
const prisma_1 = require("../lib/prisma");
// POST /api/applications
async function createApplication(req, res) {
    try {
        const { jobId, name, email, resumeLink, coverNote } = req.body;
        const jobIdNum = parseInt(jobId, 10);
        if (isNaN(jobIdNum)) {
            res.status(400).json({ success: false, message: "Invalid job ID" });
            return;
        }
        const job = await prisma_1.prisma.job.findUnique({ where: { id: jobIdNum } });
        if (!job) {
            res.status(404).json({ success: false, message: "Job not found" });
            return;
        }
        const application = await prisma_1.prisma.application.create({
            data: {
                jobId: jobIdNum,
                name,
                email,
                resumeLink,
                coverNote: coverNote || null,
            },
        });
        res.status(201).json({
            success: true,
            data: application,
            message: "Application submitted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
