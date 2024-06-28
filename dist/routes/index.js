"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trophyRouter = exports.levelRouter = exports.questionRouter = exports.authRouter = void 0;
const auth_js_1 = __importDefault(require("./auth.js"));
exports.authRouter = auth_js_1.default;
const question_js_1 = __importDefault(require("./question.js"));
exports.questionRouter = question_js_1.default;
const level_js_1 = __importDefault(require("./level.js"));
exports.levelRouter = level_js_1.default;
const trophy_js_1 = __importDefault(require("./trophy.js"));
exports.trophyRouter = trophy_js_1.default;
