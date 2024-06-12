import express from 'express';
import { authMiddleware } from '../middleware/index.js';
import { LevelController } from '../controllers/index.js';

const levelRouter = express.Router();

levelRouter.get('/:level', authMiddleware, LevelController.getLevel);

export default levelRouter;