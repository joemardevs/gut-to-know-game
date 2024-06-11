import express from 'express';
import { authMiddleware } from '../middleware/index.js';
import { getLevel } from '../controllers/index.js';

const levelRouter = express.Router();

levelRouter.get('/:level', authMiddleware, getLevel);

export default levelRouter;