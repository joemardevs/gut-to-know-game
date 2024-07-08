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
const utils_1 = require("../utils");
const Trophy_1 = __importDefault(require("../models/Trophy"));
const token_1 = require("../utils/token");
const incrementTrophyForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trophy_value } = req.body;
        const { x_auth_token } = req.headers;
        if (!x_auth_token)
            return next((0, utils_1.errorHandler)(401, "User not authenticated"));
        const tokenDecoded = (0, token_1.getTokenDecoded)(x_auth_token);
        const trophy = yield Trophy_1.default.findOne({ user: tokenDecoded._id });
        if (!trophy) {
            const newTrophy = new Trophy_1.default({
                user: tokenDecoded._id,
                trophy: trophy_value,
            });
            yield newTrophy.save();
            return res.status(201).send({
                success: true,
                message: "Trophy updated",
                trophy: newTrophy,
            });
        }
        trophy.trophy += trophy_value;
        yield trophy.save();
        res.status(200).send({
            success: true,
            message: "Trophy updated",
            trophy,
        });
    }
    catch (error) {
        next((0, utils_1.errorHandler)(500, error.message));
    }
});
const getUsersWithTrophies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = yield Trophy_1.default.find()
            .populate("user", "name username email")
            .sort({ trophy: -1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = yield Trophy_1.default.countDocuments();
        res.status(200).send({
            success: true,
            message: "Users with trophies",
            data: {
                users,
                pagination: {
                    total,
                    page: +page,
                    limit: +limit,
                    totalPages: Math.ceil(total / +limit),
                },
            },
        });
    }
    catch (error) {
        next((0, utils_1.errorHandler)(500, error.message));
    }
});
exports.default = { incrementTrophyForUser, getUsersWithTrophies };
