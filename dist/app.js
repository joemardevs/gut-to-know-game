"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_js_1 = require("./routes/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables from .env file
dotenv_1.default.config();
// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not defined.");
    process.exit(1); // Exit the process since MongoDB connection cannot be established
}
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch(error => {
    console.log("Error connecting to MongoDB: ", error.message);
});
// Initialize Express
const app = (0, express_1.default)();
// Parse URL-encoded bodies
app.use((0, cookie_parser_1.default)());
// Enable CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
// Parse JSON bodies
app.use(express_1.default.json());
// Define a route
app.use("/api/auth", index_js_1.authRouter);
app.use("/api/question", index_js_1.questionRouter);
app.use("/api/level", index_js_1.levelRouter);
app.use("/api/trophy", index_js_1.trophyRouter);
//Middleware to handle errors
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).send({
        success: false,
        statusCode,
        message,
    });
});
const PORT = 3000;
// Define a route
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
