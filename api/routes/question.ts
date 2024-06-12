import express from "express";
import { QuestionController } from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

const questionRouter = express.Router();

questionRouter.get(
  "/level/:level",
  authMiddleware,
  QuestionController.getQuestions
);
questionRouter.get(
  "/get-question/:id",
  authMiddleware,
  QuestionController.getQuestion
);
questionRouter.post(
  "/answered/:id",
  authMiddleware,
  QuestionController.questionAnswered
);

export default questionRouter;
