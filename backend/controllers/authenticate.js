import crypto from 'crypto';
import User from '../modals/userModel.js'

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the reset token and expiration date
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Instead of sending an email, return the token to the client
    res.status(200).json({
      message: 'Token generated successfully',
      resetToken, // Send the token in the response
    });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    res.status(500).json({ message: 'Error initiating password reset' });
  }
};

// Function to reset the password using the token
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const trimmedToken = token.trim();
    const hashedToken = crypto.createHash('sha256').update(trimmedToken).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token hasn't expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set the new password (assuming you have a pre-save hook for hashing)
    user.password = newPassword; // Hashing will happen in the pre-save middleware
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration date

    await user.save(); // This will trigger the pre-save middleware to hash the new password
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
