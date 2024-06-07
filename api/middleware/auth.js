import { errorHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const { x_auth_token } = req.headers;

        if (!x_auth_token) return next(errorHandler(401, "Missing token"));

        // Verify token
        jwt.verify(x_auth_token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) return next(errorHandler(401, "Unauthorized"));

            req.user = decoded;
            next();
        });

    } catch (error) {
        next(errorHandler(500, error.message));
    }
}