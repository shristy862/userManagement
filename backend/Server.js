import express from 'express';
import connectDB from './utils/db.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
// Middleware
app.use(express.json()); 

// Connect to DB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at =>  http://localhost:${PORT}`));
