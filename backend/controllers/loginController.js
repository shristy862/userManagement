import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/userModel.js' ;
import Company from '../modals/companyModal.js'; 

export const login = async (req, res) => {
  const { email, password } = req.body;
  const trimmedPassword = password.trim();
  console.log(trimmedPassword);
  console.log('Received login data:', req.body);
  
  try {
    
    let user = await User.findOne({ email });

    if (!user) {
      user = await Company.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
    }

    console.log('Plain text password:', trimmedPassword);
    console.log('Hashed password:', user.password);
    
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Prepare the response based on the role
    const responseUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      // Include companyName if the user is a company
      ...(user.role === 'company' && { name: user.companyName }),
      // Include name if the user is an admin or other types
      ...(user.role !== 'company' && { name: user.name })
    };

    res.json({ 
      message: 'Login Successful', 
      token, 
      user: responseUser 
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
