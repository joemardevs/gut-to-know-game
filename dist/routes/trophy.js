"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../middleware/index.js");
const index_js_2 = require("../controllers/index.js");
const trophyRouter = express_1.default.Router();
trophyRouter.get("/", index_js_1.authMiddleware, index_js_2.TrophyController.getUsersWithTrophies);
trophyRouter.post("/increment-trophy", index_js_1.authMiddleware, index_js_2.TrophyController.incrementTrophyForUser);
exports.default = trophyRouter;
