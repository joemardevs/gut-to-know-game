"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidator = [
    (0, express_validator_1.check)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 6 characters long"),
];
exports.signinValidator = [
    (0, express_validator_1.check)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
];
