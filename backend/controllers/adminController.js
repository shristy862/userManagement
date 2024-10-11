const Company = require('../modals/companyModal');  
const User = require('../modals/userModel');        

exports.getAdminDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role; 
    
    const welcomeMessage = `Welcome ${userRole}!`;

    res.json({
      message: welcomeMessage,
      userId,
      role: userRole
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const userId = req.params.id; 

    // Validate if the user exists 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      companyName,
      registrationNo,
      gstNo,
      companyId,
      contactNo,
      location,
      representative,
      email,
      password 
    } = req.body;

    const company = new Company({
      companyName,
      registrationNo,
      gstNo,
      companyId,
      contactNo,
      location,
      representative,
      email,
      password, 
      role: 'company',
      userId 
    });

    await company.save();

    res.status(201).json({
      message: 'Company added successfully!',
      company: {
        id: company._id,
        companyName: company.companyName,
        registrationNo: company.registrationNo,
        gstNo: company.gstNo,
        companyId: company.companyId,
        contactNo: company.contactNo,
        location: company.location,
        representative: company.representative,
        email: company.email,
        role: company.role,
        userId: company.userId
      }
    });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ message: 'Server error. Could not add company.' });
  }
};
