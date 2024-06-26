import { Question } from "../models/index.js";
import { errorHandler } from "../utils/index.js";
import { NextFunction, Request, Response } from "express";

const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get params
    const { level } = req.params;

    const questions = await Question.find({ level });
    res.status(200).send({
      success: true,
      message: "Questions found",
      questions,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) return next(errorHandler(404, "Question not found"));

    res.status(200).send({
      success: true,
      message: "Question found",
      question,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const questionAnswered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { isQuestionAnsweredCorrect } = req.body;

    const question = await Question.findById(id);

    if (!question) return next(errorHandler(404, "Question not found"));

    question.isAnswered = true;
    question.isQuestionAnsweredCorrect = isQuestionAnsweredCorrect;
    await question.save();

    res.status(200).send({
      success: true,
      message: "Question answered",
      question,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

export default { getQuestions, getQuestion, questionAnswered };
