"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = require("../controllers/application.controller");
const applicationValidator_1 = require("../middleware/applicationValidator");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
router.post("/", applicationValidator_1.applicationValidator, validate_1.handleValidationErrors, application_controller_1.createApplication);
exports.default = router;
