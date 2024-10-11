import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false); // State to track email verification

  // Form submission logic for email
  const handleEmailSubmit = async () => {
    console.log('Email submitted:', email);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email in the request body
      });

      const data = await response.json();
      console.log('API Response:', data); // Log the API response here

      if (response.ok) {
        // Log the generated reset token
        console.log('Generated Reset Token:', data.resetToken);
        
        // Store the reset token in session storage
        sessionStorage.setItem('resetToken', data.resetToken);

        message.success('Email verified! You can now reset your password.');
        setIsEmailVerified(true); // Show the password fields after successful email verification
      } else {
        message.error(data.message || 'Error verifying email');
      }
    } catch (error) {
      console.error('Error during email submission:', error);
      message.error('Error verifying email');
    }
  };

  // Form submission logic for password
  const handlePasswordSubmit = async () => {
    if (!newPassword) {
      message.error('Password cannot be empty');
      return; // Prevent further execution if password is empty
    }
    
    try {
      console.log('New password submitted:', newPassword);
      
      // Retrieve the reset token from session storage
      const resetToken = sessionStorage.getItem('resetToken');
      console.log('Reset Token:', resetToken); // Log the reset token when submitting the new password
      
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: resetToken, newPassword }), // Include the token and new password
      });

      const data = await response.json();
      console.log('Password Reset Response:', data); // Log the API response

      if (response.ok) {
        message.success('Password has been reset successfully!');
        sessionStorage.removeItem('resetToken');
        onClose(); // Close the modal after successful reset
      } else {
        message.error(data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      message.error('Error resetting password');
    }
  };

  return (
    <Modal
      title="Forgot Password"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      {/* Show email input only if email is not verified */}
      {!isEmailVerified ? (
        <div>
          <h3>Enter Your Email</h3>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <Button type="primary" onClick={handleEmailSubmit} style={{ marginBottom: '20px' }}>
            Submit Email
          </Button>
        </div>
      ) : (
        <div>
          <h3>Reset Your Password</h3>
          <Input.Password
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <Button type="primary" onClick={handlePasswordSubmit}>
            Submit Password
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
