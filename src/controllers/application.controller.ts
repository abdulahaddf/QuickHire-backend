import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// POST /api/applications
export async function createApplication(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    const jobIdNum = parseInt(jobId, 10);
    if (isNaN(jobIdNum)) {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }

    const job = await prisma.job.findUnique({ where: { id: jobIdNum } });
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    const application = await prisma.application.create({
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
