// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
// import routes from './routes'; // Import your routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Define routes
// app.use('/api', routes); // Use routes under /api

export default app;
