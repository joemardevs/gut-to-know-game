import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils";
import { User } from "../models";
import Trophy from "../models/Trophy";

const incrementTrophyForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, trophy_value } = req.body;

    const user = await User.findById(user_id);

    if (!user) return next(errorHandler(404, "User not found"));

    let trophy = await Trophy.findOne({ user: user });

    if (!trophy) {
      trophy = new Trophy({
        user: user,
        trophy: trophy_value,
      });
    } else {
      trophy.trophy += trophy_value;
    }

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
