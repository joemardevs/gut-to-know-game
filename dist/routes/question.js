"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../controllers/index.js");
const index_js_2 = require("../middleware/index.js");
const questionRouter = express_1.default.Router();
questionRouter.get("/level/:level", index_js_2.authMiddleware, index_js_1.QuestionController.getQuestions);
questionRouter.get("/get-question/:id", index_js_2.authMiddleware, index_js_1.QuestionController.getQuestion);
questionRouter.post("/answered/:id", index_js_2.authMiddleware, index_js_1.QuestionController.questionAnswered);
exports.default = questionRouter;
