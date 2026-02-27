import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /api/jobs
export async function getAllJobs(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({
      success: true,
      data: jobs,
      message: "Jobs retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// GET /api/jobs/:id
export async function getJobById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: job,
      message: "Job retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// POST /api/jobs
export async function createJob(req: Request, res: Response): Promise<void> {
  try {
    const { title, company, location, category, description } = req.body;
    const job = await prisma.job.create({
      data: { title, company, location, category, description },
    });
    res.status(201).json({
      success: true,
      data: job,
      message: "Job created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// DELETE /api/jobs/:id
export async function deleteJob(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }
    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    await prisma.job.delete({ where: { id } });
    res.status(200).json({
      success: true,
      data: null,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
