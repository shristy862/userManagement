'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd'; 
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import './style.css';
import { getUserInfo } from '../db'; 


const CompanyDashboard = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch the user info from IndexedDB
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.email) {
          setCurrentEmail(userInfo.email); // Set current email from user info
        } else {
          console.error('User info not found in IndexedDB.');
        }
      } catch (error) {
        console.error('Error fetching user info from IndexedDB:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    // Retrieve the user token from IndexedDB
    const userInfoFromDB = await getUserInfo(); // Fetch user info from IndexedDB
    const token = userInfoFromDB?.token; // Get token from the user info

    if (!token) {
      message.warning('Please log in to update your email.'); // Alert for login requirement
      return;
    }

    if (currentEmail === newEmail) {
      message.warning('New email must be different from the current email.'); // Alert for email match
      return;
    }

    try {
      const response = await fetch('https://admin-4-hoom.onrender.com/api/auth/company/update-email', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentEmail, newEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Email updated successfully!'); // Display success alert
        const updatedUserInfo = { ...userInfoFromDB, email: newEmail };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // Optionally update localStorage as well
        setCurrentEmail(newEmail);
        setNewEmail('');
      } else {
        message.error(data.message || 'Failed to update email.'); // Display error alert
      }
    } catch (error) {
      console.error('Error updating email:', error);
      message.error('An error occurred. Please try again.'); // Display error alert
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <Sidebar />

      <button className="update" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Update Email'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleUpdateEmail} className="email-update-form">
          <div className="form-group">
            <label className="form-label">Current Email:</label>
            <input 
              type="email" 
              value={currentEmail} 
              onChange={(e) => setCurrentEmail(e.target.value)}
              placeholder="Enter existing email" 
              className="form-input" 
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default CompanyDashboard;
