"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../controllers/index.js");
const index_js_2 = require("../validators/index.js");
const index_js_3 = require("../middleware/index.js");
const authRouter = express_1.default.Router();
authRouter.post("/signin", index_js_2.signinValidator, index_js_2.validate, index_js_1.AuthController.signin);
authRouter.post("/signup", index_js_2.signupValidator, index_js_2.validate, index_js_1.AuthController.signup);
authRouter.post("/signout", index_js_3.authMiddleware, index_js_1.AuthController.signout);
authRouter.get("/profile", index_js_3.authMiddleware, index_js_1.AuthController.profile);
exports.default = authRouter;
