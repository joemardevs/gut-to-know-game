import express from "express";
import { authMiddleware } from "../middleware/index.js";
import { TrophyController } from "../controllers/index.js";

const trophyRouter = express.Router();

trophyRouter.get("/", authMiddleware, TrophyController.getUsersWithTrophies);
trophyRouter.post(
  "/increment-trophy",
  authMiddleware,
  TrophyController.incrementTrophyForUser
);

export default trophyRouter;
