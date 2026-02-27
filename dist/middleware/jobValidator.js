"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobValidator = void 0;
const express_validator_1 = require("express-validator");
exports.jobValidator = [
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty()
        .withMessage("Job title is required"),
    (0, express_validator_1.body)("company")
        .trim()
        .notEmpty()
        .withMessage("Company name is required"),
    (0, express_validator_1.body)("location")
        .trim()
        .notEmpty()
        .withMessage("Location is required"),
    (0, express_validator_1.body)("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Job description is required"),
];
