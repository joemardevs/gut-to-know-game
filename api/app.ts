import express, { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  authRouter,
  levelRouter,
  questionRouter,
  trophyRouter,
} from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import MiddlewareError from "./types/MiddlewareError.js";

// Load environment variables from .env file
dotenv.config();

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not defined.");
  process.exit(1); // Exit the process since MongoDB connection cannot be established
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

// Initialize Express
const app = express();

// Enable CORS
app.use(
  cors({
    origin: ["https://gut-to-know.vercel.app", "http://localhost:8080"],
    credentials: true,
  })
);

// Parse URL-encoded bodies
app.use(cookieParser());

// Parse JSON bodies
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to log CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://gut-to-know.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Define a route
app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/level", levelRouter);
app.use("/api/trophy", trophyRouter);

//Middleware to handle errors
app.use(
  (
    error: MiddlewareError,
    req: Request,
    res: Response<{
      success: boolean;
      statusCode: number;
      message: string;
    }>,
    next: NextFunction
  ) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    return res.status(statusCode).send({
      success: false,
      statusCode,
      message,
    });
  }
);

const PORT = process.env.PORT || 3000;

// Define a route
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
