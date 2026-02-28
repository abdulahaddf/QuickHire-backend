import { Router } from "express";
import { createApplication, getAllApplications } from "../controllers/application.controller";
import { applicationValidator } from "../middleware/applicationValidator";
import { handleValidationErrors } from "../middleware/validate";

const router = Router();

router.get("/", getAllApplications);
router.post("/", applicationValidator, handleValidationErrors, createApplication);

export default router;
