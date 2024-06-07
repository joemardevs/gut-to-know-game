import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const signup = async (req, res, next) => {
    try {
        const { username, email, name, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({ username, email, name, password: hashedPassword });

        const userExists = await User
            .findOne({ $or: [{ username }, { email }] });

        if (userExists) return next(errorHandler(400, "User already exists"));


        await newUser.save();

        res.status(201).send({
            success: true,
            message: "User signed up successfully",
        });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

export const signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) return next(errorHandler(404, "User not found"));

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) return next(errorHandler(401, "Invalid credentials"));

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("x_auth_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            // maxAge: 86400000,
        }).status(200).send({
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
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

export const signout = (req, res, next) => {
    try {
        const { x_auth_token } = req.cookies;

        if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

        // Clear the cookie
        res.clearCookie("x_auth_token").status(200).send({
            success: true,
            message: "User signed out successfully",
        });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}


export const profile = async (req, res, next) => {
    try {
        const { x_auth_token } = req.cookies;

        if (!x_auth_token) return next(errorHandler(401, "User not authenticated"));

        const decoded = jwt.verify(x_auth_token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) return next(errorHandler(404, "User not found"));

        res.status(200).send({
            success: true,
            message: "User profile retrieved successfully",
            user,
        });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}
