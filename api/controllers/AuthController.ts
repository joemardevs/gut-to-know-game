import { Question, User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { getTokenDecoded } from "../utils/token.js";

// Load environment variables
dotenv.config();

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, name, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Fetch all questions
    const allQuestions = await Question.find();

    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
      questions: allQuestions,
    });

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) return next(errorHandler(400, "User already exists"));

    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return next(errorHandler(404, "User not found"));

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) return next(errorHandler(401, "Invalid credentials"));

    if (!process.env.JWT_SECRET)
      return next(errorHandler(500, "JWT secret not defined"));

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("x_auth_token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        // maxAge: 86400000,
      })
      .status(200)
      .send({
        success: true,
        message: "User signed in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          token,
        },
      });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const signout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { x_auth_token } = req.headers as { x_auth_token: string };

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    // Clear the cookie
    res.clearCookie("x_auth_token").status(200).send({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { x_auth_token } = req.headers as { x_auth_token: string };

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    if (!process.env.JWT_SECRET)
      return next(errorHandler(500, "JWT secret not defined"));

    const tokenDecoded = getTokenDecoded(x_auth_token);

    const user = await User.findById(tokenDecoded._id);

    if (!user) return next(errorHandler(404, "User not found"));

    res.status(200).send({
      success: true,
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

export default { signup, signin, signout, profile };
