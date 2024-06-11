import express from 'express';
import { getQuestion, getQuestions, questionAnswered } from '../controllers/index.js';
import { authMiddleware } from '../middleware/index.js';

const questionRouter = express.Router();

questionRouter.get('/level/:level', authMiddleware, getQuestions);
questionRouter.get('/get-question/:id', authMiddleware, getQuestion);
questionRouter.post('/answered/:id', authMiddleware, questionAnswered);

export default questionRouter;