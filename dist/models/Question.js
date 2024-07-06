"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ChoiceSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});
exports.QuestionSchema = new Schema({
    level: {
        type: Number,
        required: true,
    },
    additional_information: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    choices: [ChoiceSchema],
    isAnswered: {
        type: Boolean,
        default: false,
    },
    isQuestionAnsweredCorrect: {
        type: Boolean || null,
        required: false,
        default: null,
    },
    trophy: {
        type: Number,
        required: true,
    },
    picFilename: {
        type: String,
        required: true,
    },
});
const Question = mongoose_1.default.model("Question", exports.QuestionSchema, "questions");
exports.default = Question;
