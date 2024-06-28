"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LevelSchema = new Schema({
    level: {
        type: Number,
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    bgPicFileName: {
        type: String,
        required: true,
    },
});
const Level = mongoose_1.default.model("Level", LevelSchema, "levels");
exports.default = Level;
