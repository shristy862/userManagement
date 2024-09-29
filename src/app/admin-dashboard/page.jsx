"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { getUserInfo } from '../db';
import AddCompanyForm from './AddCompany'; // Make sure to import your AddCompanyForm component
import './style.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null); // State to hold dashboard data
  const [userInfo, setUserInfo] = useState(null); // State to hold user info
  const [showAddCompany, setShowAddCompany] = useState(false); // Toggle state for the company form
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Retrieve user information (token and role) from IndexedDB
      const userInfoFromDB = await getUserInfo();

      // Check if userInfo exists in IndexedDB
      if (!userInfoFromDB || !userInfoFromDB.token) {
        router.push('/login'); // Redirect to login if no token found
        return;
      }

      // Set user info state
      setUserInfo(userInfoFromDB);

      // Now fetch dashboard data using the token
      fetchDashboardData(userInfoFromDB.token);
    };

    const fetchDashboardData = async (token) => {
      try {
        const response = await fetch('https://admin-4-hoom.onrender.com/api/auth/admin-dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data); // Set dashboard data
        } else {
          console.error('Failed to load dashboard data:', response.status);
          if (response.status === 401) {
            router.push('/login'); // Redirect to login if unauthorized
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchUserInfo(); // Retrieve token and fetch data
  }, [router]);

  return (
    <div className='bg-white'>
      <Header userInfo={userInfo} />
      <Sidebar />

      <button className="btn" onClick={() => setShowAddCompany(!showAddCompany)}>
        {showAddCompany ? 'Hide' : 'Add Company'}
      </button>

      {/* Conditionally render the AddCompanyForm component */}
      {showAddCompany && <AddCompanyForm />}
    </div>
  );
};

export default AdminDashboard;
