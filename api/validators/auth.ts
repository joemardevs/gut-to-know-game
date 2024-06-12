import { check } from "express-validator";

export const signupValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
];

export const signinValidator = [
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("Password is required"),
];
