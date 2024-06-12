import { NextFunction, Request, Response } from "express";
import { Level } from "../models/index.js";
import { errorHandler } from "../utils/index.js";

const getLevel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level } = req.params;

    const levelDetails = await Level.findOne({ level });

    if (!levelDetails) return next(errorHandler(404, "Level not found"));

    res.status(200).send({
      success: true,
      message: "Level found",
      level: levelDetails,
    });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
};

export default { getLevel };
