import { Request, Response } from "express";
import { query } from "../lib/db";

// GET /api/applications
export async function getAllApplications(_req: Request, res: Response): Promise<void> {
  try {
    const result = await query(
      `SELECT a.*, j.title as "jobTitle", j.company as "jobCompany"
       FROM "Application" a
       LEFT JOIN "Job" j ON a."jobId" = j.id
       ORDER BY a."createdAt" DESC`
    );
    res.status(200).json({
      success: true,
      data: result.rows,
      message: "Applications retrieved successfully",
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

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

    const jobCheck = await query('SELECT id FROM "Job" WHERE id = $1', [jobIdNum]);
    if (jobCheck.rowCount === 0) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    const result = await query(
      'INSERT INTO "Application" ("jobId", name, email, "resumeLink", "coverNote") VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [jobIdNum, name, email, resumeLink, coverNote || null]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
