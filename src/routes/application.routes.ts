import { Router } from "express";
import { createApplication } from "../controllers/application.controller";
import { applicationValidator } from "../middleware/applicationValidator";
import { handleValidationErrors } from "../middleware/validate";

const router = Router();

router.post("/", applicationValidator, handleValidationErrors, createApplication);

export default router;
