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
const index_js_2 = require("../utils/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get params
        const { level } = req.params;
        const { x_auth_token } = req.headers;
        if (!x_auth_token)
            return next((0, index_js_2.errorHandler)(401, "User not authenticated"));
        const tokenDecoded = jsonwebtoken_1.default.verify(x_auth_token, process.env.JWT_SECRET);
        const user = yield index_js_1.User.findById(tokenDecoded._id);
        if (!user)
            return next((0, index_js_2.errorHandler)(404, "User not found"));
        const filteredQuestions = user.questions.filter(question => question.level === parseInt(level));
        res.status(200).send({
            success: true,
            message: "Questions found",
            questions: filteredQuestions,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const getQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { x_auth_token } = req.headers;
        if (!x_auth_token)
            return next((0, index_js_2.errorHandler)(401, "User not authenticated"));
        const tokenDecoded = jsonwebtoken_1.default.verify(x_auth_token, process.env.JWT_SECRET);
        const user = yield index_js_1.User.findById(tokenDecoded._id);
        if (!user)
            return next((0, index_js_2.errorHandler)(404, "User not found"));
        const question = user.questions.id(id);
        res.status(200).send({
            success: true,
            message: "Question found",
            question,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const questionAnswered = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isQuestionAnsweredCorrect } = req.body;
        const { x_auth_token } = req.headers;
        if (!x_auth_token)
            return next((0, index_js_2.errorHandler)(401, "User not authenticated"));
        const tokenDecoded = jsonwebtoken_1.default.verify(x_auth_token, process.env.JWT_SECRET);
        const user = yield index_js_1.User.findById(tokenDecoded._id);
        if (!user)
            return next((0, index_js_2.errorHandler)(404, "User not found"));
        //find the question in the user's questions array
        const question = user.questions.id(id);
        if (!question)
            return next((0, index_js_2.errorHandler)(404, "Question not found"));
        question.isAnswered = true;
        question.isQuestionAnsweredCorrect = isQuestionAnsweredCorrect;
        yield user.save();
        res.status(200).send({
            success: true,
            message: "Question answered",
            question,
            user,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
exports.default = { getQuestions, getQuestion, questionAnswered };
