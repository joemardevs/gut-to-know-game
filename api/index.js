import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter, levelRouter, questionRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
})

// Initialize Express
const app = express();


// Parse URL-encoded bodies
app.use(cookieParser())

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Define a route
app.use('/api/auth', authRouter);
app.use('/api/question', questionRouter);
app.use('/api/level', levelRouter);

//Middleware to handle errors
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).send({
        success: false,
        statusCode,
        message
    });
});

// Define a route
app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});