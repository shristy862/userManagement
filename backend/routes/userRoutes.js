import express from 'express';
import { signup } from '../controllers/signupController';
import { login } from '../controllers/loginController';
import { forgotPassword, resetPassword } from '../controllers/authController';
import adminController from '../controllers/adminController' ;
import companyController from '../controllers/companyController'; 
import fetchCompany from '../controllers/fetchCompanies';
import emailUpdateController from '../controllers/emailUpdateController';
import updateCompany from'../controllers/updateCompany';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.get('/admin-dashboard', verifyToken, adminController.getAdminDashboard);
router.post('/admin-dashboard/:id/add-company', verifyToken, adminController.addCompany);
router.get('/admin-dashboard/:id/fetchaddedcompanies', verifyToken, fetchCompany.fetchAddedCompanies);
router.get('/company-dashboard', verifyToken,companyController.getCompanyDashboard);
router.put('/company-dashboard/:id/update-email', verifyToken, emailUpdateController.updateEmail);
router.put('/admin-dashboard/:id/update_company_details', verifyToken, updateCompany.updateCompanyDetails);

module.exports = router;
