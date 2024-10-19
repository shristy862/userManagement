import User  from '../modals/userModel.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received signup data:', req.body);

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });

    console.log('Plain password before hashing:', password);

    await user.save(); 

    console.log('Hashed password:', user.password);
    console.log('User saved successfully:', user); 

    return res.status(201).json({ 
      message: 'Signup successful!', 
      user: { 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};
