"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Alert } from 'antd';
import './style.css'; 
import { storeCompanyDetails, getUserInfo } from '../db';
const AddCompany = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    registrationNo: '',
    gstNo: '',
    companyId: '',
    contactNo: '',
    location: '',
    representative: '',
    email: '',
    password: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const addCompany = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setLoading(true); // Set loading state to true to indicate the process started
  
    try {
      // Retrieve the token from IndexedDB
      const userInfo = await getUserInfo();
      
      // Log the entire userInfo to ensure the data is being retrieved
      console.log('Retrieved userInfo:', userInfo);

      if (!userInfo || !userInfo.token) {
        console.log('No user info or token found. Redirecting to login...');
        router.push('/login'); // Redirect to login if no user info or token is found
        return;
      }

      const token = userInfo.token;
      console.log('Retrieved token from IndexedDB:', token); // Log the token for debugging
  
      // Make API call to add company
      const response = await fetch('https://admin-4-hoom.onrender.com/api/auth/addcompany', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in Authorization header
          'Content-Type': 'application/json', // Set content type as JSON
        },
        body: JSON.stringify(companyDetails), // Send company details as JSON
      });
  
      console.log('API Response:', response); // Log API response for debugging
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Company added successfully:', responseData);
  
        // Store company details in IndexedDB
        await storeCompanyDetails(companyDetails);
  
        // Set success alert message and display it
        setAlertMessage('Company added successfully!');
        setShowAlert(true);
  
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Error adding company:', errorData);
  
        // Set error alert message
        setAlertMessage(errorData.message || 'Failed to add company. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Unexpected error adding company:', error.message);
  
      // Set error alert message for unexpected errors
      setAlertMessage('An unexpected error occurred. Please try again later.');
      setShowAlert(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      {showAlert && (
        <Alert
          message={alertMessage}
          type={alertMessage.includes('successfully') ? 'success' : 'error'} // Show success/error based on the message content
          showIcon
          closable
          onClose={() => setShowAlert(false)} // Allow closing the alert manually
          style={{ marginBottom: '16px' }}
        />
      )}
      <form onSubmit={addCompany}>
        <input
          type="text"
          name="companyName"
          value={companyDetails.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          name="registrationNo"
          value={companyDetails.registrationNo}
          onChange={handleInputChange}
          placeholder="Registration No"
          required
        />
        <input
          type="text"
          name="gstNo"
          value={companyDetails.gstNo}
          onChange={handleInputChange}
          placeholder="GST No"
          required
        />
        <input
          type="text"
          name="companyId"
          value={companyDetails.companyId}
          onChange={handleInputChange}
          placeholder="Company ID"
          required
        />
        <input
          type="text"
          name="contactNo"
          value={companyDetails.contactNo}
          onChange={handleInputChange}
          placeholder="Contact No"
          required
        />
        <input
          type="text"
          name="location"
          value={companyDetails.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="representative"
          value={companyDetails.representative}
          onChange={handleInputChange}
          placeholder="Representative"
          required
        />
        <input
          type="email"
          name="email"
          value={companyDetails.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={companyDetails.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Company...' : 'Add Company'}
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
