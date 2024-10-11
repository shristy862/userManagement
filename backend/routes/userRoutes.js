const express = require('express');
const { signup } = require('../controllers/signupController');
const { login } = require('../controllers/loginController');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const companyController = require('../controllers/companyController'); 
const fetchCompany = require('../controllers/fetchCompanies')
const emailUpdateController = require('../controllers/emailUpdateController');
const updateCompany = require('../controllers/updateCompany');
const verifyToken = require('../middleware/verifyToken');

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
