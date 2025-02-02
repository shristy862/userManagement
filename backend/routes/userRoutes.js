import express from 'express';
import { signup } from '../controllers/signupController.js';
import { login } from '../controllers/loginController.js';
import { forgotPassword, resetPassword } from '../controllers/authenticate.js';
import adminController from '../controllers/adminController.js';
import { getCompanyDashboard } from '../controllers/companyController.js';
import fetchAddedCompanies from '../controllers/fetchCompanies.js'; 
import updateEmail from '../controllers/emailUpdateController.js';
import updateCompanyDetails from '../controllers/updateCompany.js';
import verifyToken from '../middleware/verifyToken.js';
const { getAdminDashboard, addCompany } = adminController;
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.get('/admin-dashboard', verifyToken, getAdminDashboard);
router.post('/admin-dashboard/:id/add-company', verifyToken, addCompany);
router.get('/admin-dashboard/:id/companies', verifyToken, fetchAddedCompanies);
router.get('/company-dashboard', verifyToken, getCompanyDashboard);
router.put('/admin-dashboard/:id/update_email', verifyToken, updateEmail);
router.put('/admin-dashboard/:id/update_company_details', verifyToken, updateCompanyDetails);

console.log('signup:', signup);
console.log('login:', login);
console.log('forgotPassword:', forgotPassword);
console.log('resetPassword:', resetPassword);
console.log('adminController:', adminController);
console.log('companyController:',  getCompanyDashboard);
export default router;
