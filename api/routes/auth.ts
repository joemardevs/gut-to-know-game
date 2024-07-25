import express from "express";
import { AuthController } from "../controllers/index.js";
import {
  signinValidator,
  signupValidator,
  validate,
} from "../validators/index.js";
import { authMiddleware } from "../middleware/index.js";

const authRouter = express.Router();

authRouter.post("/signin", signinValidator, validate, AuthController.signin);
authRouter.post("/signup", signupValidator, validate, AuthController.signup);
authRouter.post("/signout", authMiddleware, AuthController.signout);

authRouter.get("/profile", authMiddleware, AuthController.profile);
authRouter.put("/update-avatar", authMiddleware, AuthController.updateAvatar);

export default authRouter;
