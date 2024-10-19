import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authenticate.js';

const router = express.Router(); 

// Defining routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


export default router; 
