import  Company from 'modals/companyModal';

exports.getCompanyDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'company') {
      return res.status(403).json({ message: 'Access denied. Only company users are allowed.' });
    }

    const company = await Company.findById(userId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const welcomeMessage = `Welcome ${company.companyName}!`;

    if (!company.role) {
      company.role = 'company';  
      await company.save();
    }

    res.json({
      message: welcomeMessage,
      companyId: company._id,
      email: company.email,
      userRole: company.role, 
    });

  } catch (error) {
    console.error('Error in company dashboard:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
