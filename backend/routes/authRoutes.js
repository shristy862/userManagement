import express  from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

module.exports = router;
