"use client";
import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import AddCompanyForm from './add_company';
import FetchCompanies from './fetchCompany'; // Import the FetchCompanies component
import useDashboardData from '../hooks/useDashboardData';
import './style.css';

const AdminDashboard = () => {
  // Fetch admin dashboard data using the hook
  const { userId, role, dashboardData } = useDashboardData('admin-dashboard'); // Pass the endpoint

  const [showAddCompany, setShowAddCompany] = useState(false); // Toggle state for the company form
  const [showCompanies, setShowCompanies] = useState(false); // Toggle state for showing companies

  const handleToggleCompanies = () => {
    setShowCompanies(!showCompanies); // Toggle visibility of companies
  };

  // Handle conditional rendering or display messages
  if (!dashboardData) {
    return <div>Loading dashboard...</div>; // Show loading state while fetching data
  }

  return (
    <div className='bg-white'>
      <Header 
        role={role} 
        userId={userId} 
      />
      <Sidebar role={role} />

      <button className="btn" onClick={() => setShowAddCompany(!showAddCompany)}>
        {showAddCompany ? 'Hide' : 'Add Company'}
      </button>

      {showAddCompany && <AddCompanyForm />}

      {/* Button to view added companies */}
      <button className="btn1" onClick={handleToggleCompanies}>
        {showCompanies ? 'Hide Added Companies' : 'View Added Companies'}
      </button>

      {/* Conditionally render FetchCompanies when the button is clicked */}
      {showCompanies && <FetchCompanies />}

    </div>
  );
};

export default AdminDashboard;
