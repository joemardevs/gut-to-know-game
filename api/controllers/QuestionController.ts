import { Question, User } from "../models/index.js";
import { errorHandler } from "../utils/index.js";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTokenDecoded } from "../utils/token.js";

const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get params
    const { level } = req.params;
    const { x_auth_token } = req.headers;

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    const tokenDecoded = getTokenDecoded(x_auth_token as string);

    const user = await User.findById(tokenDecoded._id);

    if (!user) return next(errorHandler(404, "User not found"));

    const filteredQuestions = user.questions.filter(
      question => question.level === parseInt(level)
    );

    res.status(200).send({
      success: true,
      message: "Questions found",
      questions: filteredQuestions,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { x_auth_token } = req.headers;

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    const tokenDecoded = getTokenDecoded(x_auth_token as string);

    const user = await User.findById(tokenDecoded._id);

    if (!user) return next(errorHandler(404, "User not found"));

    const question = user.questions.id(id);

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
    const { x_auth_token } = req.headers;

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    const tokenDecoded = getTokenDecoded(x_auth_token as string);

    const user = await User.findById(tokenDecoded._id);

    if (!user) return next(errorHandler(404, "User not found"));

    //find the question in the user's questions array
    const question = user.questions.id(id);

    if (!question) return next(errorHandler(404, "Question not found"));

    question.isAnswered = true;
    question.isQuestionAnsweredCorrect = isQuestionAnsweredCorrect;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Question answered",
      question,
      user,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

export default { getQuestions, getQuestion, questionAnswered };
