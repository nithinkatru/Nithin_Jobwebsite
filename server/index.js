import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Define Port number 
const PORT = process.env.PORT || 5000;

// Import Routes
import connectDB from './src/config/db.js';
import jobRoutes from './src/routes/jobRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// Middleware
const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();
app.use(cookieParser());

// Custom middleware
import { errorHandler } from './src/middlewares/errorHandler.js'; // middleware for error handel

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/jobs', jobRoutes); // jobRoutes
app.use('/api/users', userRoutes); // registration route
app.use('/api/auth', authRoutes); // authentication routes


// Error handling middleware
app.use(errorHandler);

// Create and start an Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
