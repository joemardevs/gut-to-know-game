import express from 'express';
import { profile, signin, signout, signup } from '../controllers/index.js';
import { signinValidator, signupValidator, validate } from '../validators/index.js';
import { authMiddleware } from '../middleware/index.js';

const authRouter = express.Router();

authRouter.post('/signin', signinValidator, validate, signin)
authRouter.post('/signup', signupValidator, validate, signup)
authRouter.post('/signout', authMiddleware, signout);

authRouter.get("/profile", authMiddleware, profile)

export default authRouter;