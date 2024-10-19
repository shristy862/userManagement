"use client";
import React, { useState, useEffect } from 'react';
import { message } from 'antd'; 
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import UpdateForm from '../Forms/update_email_form'; 
import './style.css';
import useDashboardData from '../hooks/useDashboardData'; 

const CompanyDashboard = () => {
  const [currentEmail, setCurrentEmail] = useState(''); 
  const [newEmail, setNewEmail] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); 
  
  const { userId, role, dashboardData } = useDashboardData('company-dashboard');

  useEffect(() => {
    if (dashboardData) {
      const companyEmail = dashboardData.email || ''; 
      setCurrentEmail(companyEmail); 
    }
  }, [dashboardData]); 

  // Loading state for the dashboard
  if (!dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    // Retrieve userInfo from session storage
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log('userInfo from update email route',userInfo)
    // Extract userId and token from userInfo
    const userId = userInfo?.id; // Adjust according to your userInfo structure
    const token = userInfo?.token;     // Adjust according to your userInfo structure

    // Log userId and token to the console
    console.log('User ID from update email:', userId);
    console.log('Token from update email:', token);

    try {
        const response = await fetch(`http://localhost:5000/api/users/company-dashboard/${userId}/update_email`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ newEmail }),
        });

        const data = await response.json();

        if (response.ok) {
            message.success(data.message);
            setCurrentEmail(newEmail); // Update current email to the new email
            setNewEmail(''); // Clear the input field
        } else {
            message.error(data.message);
        }
    } catch (error) {
        console.error('Error updating email:', error);
        message.error('Something went wrong. Please try again.');
    }
};

  return (
    <div className="bg-white">
      <Header role={role} userId={userId} />
      <Sidebar />
      
      {/* Pass the necessary props to UpdateForm */}
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