"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_js_2 = require("../utils/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, name, password } = req.body;
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const newUser = new index_js_1.User({
            username,
            email,
            name,
            password: hashedPassword,
        });
        const userExists = yield index_js_1.User.findOne({ $or: [{ username }, { email }] });
        if (userExists)
            return next((0, index_js_2.errorHandler)(400, "User already exists"));
        yield newUser.save();
        res.status(201).send({
            success: true,
            message: "User signed up successfully",
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield index_js_1.User.findOne({ username });
        if (!user)
            return next((0, index_js_2.errorHandler)(404, "User not found"));
        const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordMatch)
            return next((0, index_js_2.errorHandler)(401, "Invalid credentials"));
        if (!process.env.JWT_SECRET)
            return next((0, index_js_2.errorHandler)(500, "JWT secret not defined"));
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res
            .cookie("x_auth_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            // maxAge: 86400000,
        })
            .status(200)
            .send({
            success: true,
            message: "User signed in successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                token,
            },
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const signout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { x_auth_token } = req.cookies;
        if (!x_auth_token)
            return next((0, index_js_2.errorHandler)(401, "User not authenticated"));
        // Clear the cookie
        res.clearCookie("x_auth_token").status(200).send({
            success: true,
            message: "User signed out successfully",
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { x_auth_token } = req.cookies;
        if (!x_auth_token)
            return next((0, index_js_2.errorHandler)(401, "User not authenticated"));
        if (!process.env.JWT_SECRET)
            return next((0, index_js_2.errorHandler)(500, "JWT secret not defined"));
        const decoded = jsonwebtoken_1.default.verify(x_auth_token, process.env.JWT_SECRET);
        const user = yield index_js_1.User.findById(decoded._id);
        if (!user)
            return next((0, index_js_2.errorHandler)(404, "User not found"));
        res.status(200).send({
            success: true,
            message: "User profile retrieved successfully",
            user,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
exports.default = { signup, signin, signout, profile };
