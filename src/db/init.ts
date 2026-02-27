import { pool } from "../lib/db";

const initDb = async () => {
  const createJobsTable = `
    CREATE TABLE IF NOT EXISTS "Job" (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      "logoUrl" VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS "Application" (
      id SERIAL PRIMARY KEY,
      "jobId" INTEGER NOT NULL REFERENCES "Job"(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      "resumeLink" VARCHAR(255) NOT NULL,
      "coverNote" TEXT,
      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createJobsTable);
    console.log("Job table created.");
    await pool.query(createApplicationsTable);
    console.log("Application table created.");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
};

initDb();
