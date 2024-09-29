'use client';
import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import AddCompanyForm from './AddCompany'; // Ensure this is your AddCompanyForm component
import useDashboardData from '../hooks/useDashboardData'; // Adjust the path if necessary
import './style.css';

const AdminDashboard = () => {
  const { dashboardData, userInfo } = useDashboardData(); // Use the custom hook
  const [showAddCompany, setShowAddCompany] = React.useState(false); // Toggle state for the company form

  return (
    <div className='bg-white'>
      <Header 
        userInfo={userInfo} 
        dashboardMessage={dashboardData?.message} // Pass dashboard message
      />
      <Sidebar />

      <button className="btn" onClick={() => setShowAddCompany(!showAddCompany)}>
        {showAddCompany ? 'Hide' : 'Add Company'}
      </button>

      {showAddCompany && <AddCompanyForm />}
    </div>
  );
};

export default AdminDashboard;
