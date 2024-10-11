require('dotenv').config(); 
const express = require('express');
const connectDB = require('./utils/db');
const cors = require('cors');
const app = express();

app.use(cors());
// Middleware
app.use(express.json()); // For parsing JSON data

// Connect to DB
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at =>  http://localhost:${PORT}`));
