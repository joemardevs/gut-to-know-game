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
const index_js_1 = require("../models/index.js");
const index_js_2 = require("../utils/index.js");
const getQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get params
        const { level } = req.params;
        const questions = yield index_js_1.Question.find({ level });
        res.status(200).send({
            success: true,
            message: "Questions found",
            questions,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
const getQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield index_js_1.Question.findById(id);
        if (!question)
            return next((0, index_js_2.errorHandler)(404, "Question not found"));
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
        const question = yield index_js_1.Question.findById(id);
        if (!question)
            return next((0, index_js_2.errorHandler)(404, "Question not found"));
        question.isAnswered = true;
        question.isQuestionAnsweredCorrect = isQuestionAnsweredCorrect;
        yield question.save();
        res.status(200).send({
            success: true,
            message: "Question answered",
            question,
        });
    }
    catch (error) {
        next((0, index_js_2.errorHandler)(500, error.message));
    }
});
exports.default = { getQuestions, getQuestion, questionAnswered };
