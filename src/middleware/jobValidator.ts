import { body } from "express-validator";

export const jobValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),
];
