import { body } from "express-validator";

export const applicationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Your name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("resumeLink")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required")
    .isURL()
    .withMessage("Resume link must be a valid URL"),
  body("coverNote")
    .optional()
    .trim(),
];
