import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/job.controller";
import { jobValidator } from "../middleware/jobValidator";
import { handleValidationErrors } from "../middleware/validate";

const router = Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", jobValidator, handleValidationErrors, createJob);
router.delete("/:id", deleteJob);

export default router;
