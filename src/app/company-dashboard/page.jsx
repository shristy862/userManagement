"use client";
import React, { useState, useEffect } from 'react';
import { message } from 'antd'; 
import { useRouter } from 'next/navigation'; 
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import UpdateForm from '../Forms/update_email_form'; // Import the UpdateForm component
import './style.css';
import { getUserInfo } from '../db'; // Utility to fetch user info from IndexedDB
import { BASE_URL } from '../../Config'; // Base URL for API requests

const CompanyDashboard = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false); // Track if email is updated
  const router = useRouter(); // Initialize the router

  // Fetch user information when component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.email) {
          setCurrentEmail(userInfo.email); // Set the current email from userInfo
        } else {
          console.error('User information not found in IndexedDB.');
        }
      } catch (error) {
        console.error('Error fetching user info from IndexedDB:', error);
      }
    };

    fetchUserInfo(); // Fetch user info on component mount
  }, []);

  // Handle email update form submission
  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    const userInfoFromDB = await getUserInfo(); // Fetch user info from IndexedDB
    const token = userInfoFromDB?.token; // Get token from the user info

    if (!token) {
      message.warning('Please log in to update your email.');
      return;
    }

    if (currentEmail === newEmail) {
      message.warning('New email must be different from the current email.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}company/update-email`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentEmail, newEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Email updated successfully! Redirecting to login...');
        const updatedUserInfo = { ...userInfoFromDB, email: newEmail };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // Optionally update localStorage
        setCurrentEmail(newEmail);
        setNewEmail('');
        setEmailUpdated(true); // Set emailUpdated to true
      } else {
        message.error(data.message || 'Failed to update email.');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      message.error('An error occurred. Please try again.');
    }
  };

  // Redirect to /login 5 seconds after email update
  useEffect(() => {
    if (emailUpdated) {
      const timer = setTimeout(() => {
        router.push('/login'); // Redirect to login
      }, 5000); // 5-second delay

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [emailUpdated, router]);

  return (
    <div className="bg-white">
      <Header />
      <Sidebar />
      
      {/* Render the UpdateForm component */}
      <UpdateForm
        currentEmail={currentEmail}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        handleUpdateEmail={handleUpdateEmail}
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
      />
    </div>
  );
};

export default CompanyDashboard;
