"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationValidator = void 0;
const express_validator_1 = require("express-validator");
exports.applicationValidator = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Your name is required"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email address"),
    (0, express_validator_1.body)("resumeLink")
        .trim()
        .notEmpty()
        .withMessage("Resume link is required")
        .isURL()
        .withMessage("Resume link must be a valid URL"),
    (0, express_validator_1.body)("coverNote")
        .optional()
        .trim(),
];
