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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const index_js_1 = require("../utils/index.js");
const token_js_1 = require("../utils/token.js");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { x_auth_token } = req.headers;
        if (!x_auth_token)
            return next((0, index_js_1.errorHandler)(401, "Missing token"));
        if (!process.env.JWT_SECRET)
            return next((0, index_js_1.errorHandler)(500, "JWT secret not defined"));
        // Verify token
        const decoded = (0, token_js_1.getTokenDecoded)(x_auth_token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next((0, index_js_1.errorHandler)(500, error.message));
    }
});
exports.authMiddleware = authMiddleware;
