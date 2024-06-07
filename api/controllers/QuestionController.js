import { ObjectId } from "mongodb";
import { Question } from "../models/index.js";
import { errorHandler } from "../utils/index.js";

export const getQuestions = async (req, res) => {
    try {
        //get params
        const { level } = req.query;

        const questions = await Question.find({ level });
        res.status(200).send({
            success: true,
            message: 'Questions found',
            questions
        });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

export const getQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question = await Question.findById(id);

        if (!question) return next(errorHandler(404, 'Question not found'));

        res.status(200).send({
            success: true,
            message: 'Question found',
            question
        });
    }
    catch (error) {
        next(errorHandler(500, error.message));
    }
}


export const questionAnswered = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isQuestionAnsweredCorrect } = req.body;

        const question = await Question.findById(id);

        if (!question) return next(errorHandler(404, 'Question not found'));
        console.log("isQuestionAnsweredCorrect", isQuestionAnsweredCorrect);

        question.isAnswered = true;
        question.isQuestionAnsweredCorrect = isQuestionAnsweredCorrect;
        await question.save();

        res.status(200).send({
            success: true,
            message: 'Question answered',
            question
        });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}