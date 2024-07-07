import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils";
import Trophy from "../models/Trophy";
import jwt, { JwtPayload } from "jsonwebtoken";

const incrementTrophyForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { trophy_value } = req.body;
    const { x_auth_token } = req.headers;

    if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

    const tokenDecoded = jwt.verify(
      x_auth_token as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const trophy = await Trophy.findOne({ user: tokenDecoded._id });

    if (!trophy) {
      const newTrophy = new Trophy({
        user: tokenDecoded._id,
        trophy: trophy_value,
      });

      await newTrophy.save();

      return res.status(201).send({
        success: true,
        message: "Trophy updated",
        trophy: newTrophy,
      });
    }

    trophy.trophy += trophy_value;

    await trophy.save();

    res.status(200).send({
      success: true,
      message: "Trophy updated",
      trophy,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

const getUsersWithTrophies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await Trophy.find()
      .populate("user", "name username email")
      .sort({ trophy: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Trophy.countDocuments();

    res.status(200).send({
      success: true,
      message: "Users with trophies",
      data: {
        users,
        pagination: {
          total,
          page: +page,
          limit: +limit,
          totalPages: Math.ceil(total / +limit),
        },
      },
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

export default { incrementTrophyForUser, getUsersWithTrophies };
