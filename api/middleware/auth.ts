import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { x_auth_token } = req.headers as { x_auth_token: string };

    if (!x_auth_token) return next(errorHandler(401, "Missing token"));

    if (!process.env.JWT_SECRET)
      return next(errorHandler(500, "JWT secret not defined"));

    // Verify token
    const decoded: JwtPayload = jwt.verify(
      x_auth_token,
      process.env.JWT_SECRET
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};
