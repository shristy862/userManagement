import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './utils/db';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
const app = express();

app.use(cors());
// Middleware
app.use(express.json()); // For parsing JSON data

// Connect to DB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at =>  http://localhost:${PORT}`));
