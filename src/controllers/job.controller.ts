import { Request, Response } from "express";
import { query } from "../lib/db";

// GET /api/jobs
export async function getAllJobs(_req: Request, res: Response): Promise<void> {
  try {
    const result = await query('SELECT * FROM "Job" ORDER BY "createdAt" DESC');
    res.status(200).json({
      success: true,
      data: result.rows,
      message: "Jobs retrieved successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// GET /api/jobs/:id
export async function getJobById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }
    const result = await query('SELECT * FROM "Job" WHERE id = $1', [id]);
    const job = result.rows[0];
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: job,
      message: "Job retrieved successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// POST /api/jobs
export async function createJob(req: Request, res: Response): Promise<void> {
  try {
    const { title, company, logoUrl, location, category, description } = req.body;
    const finalLogoUrl = logoUrl || "/Company/talkit 1.png"; // Use generic logo if not provided

    const result = await query(
      'INSERT INTO "Job" (title, company, "logoUrl", location, category, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, company, finalLogoUrl, location, category, description]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Job created successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// DELETE /api/jobs/:id
export async function deleteJob(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }
    const result = await query('DELETE FROM "Job" WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.status(200).json({
      success: true,
      data: null,
      message: "Job deleted successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
