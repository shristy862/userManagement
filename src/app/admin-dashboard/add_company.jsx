// forms/AddCompany.jsx
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Alert } from 'antd';
import './style.css'; 
import { storeCompanyDetails, getUserInfo } from '../db';
import { BASE_URL } from '../../Config'; 
import AddComForm from '../Forms/add_com_form'; // Import the form component

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
      
      if (!userInfo || !userInfo.token) {
        router.push('/login'); // Redirect to login if no user info or token is found
        return;
      }

      const token = userInfo.token;
  
      // Make API call to add company
      const response = await fetch(`${BASE_URL}addcompany`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyDetails),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        await storeCompanyDetails(companyDetails);
        setAlertMessage('Company added successfully!');
        setShowAlert(true);
  
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.message || 'Failed to add company. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
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
          type={alertMessage.includes('successfully') ? 'success' : 'error'}
          showIcon
          closable
          onClose={() => setShowAlert(false)}
          style={{ marginBottom: '16px' }}
        />
      )}
      {/* Render the form using AddComForm component */}
      <AddComForm 
        companyDetails={companyDetails}
        handleInputChange={handleInputChange}
        addCompany={addCompany}
        loading={loading}
      />
    </div>
  );
};

export default AddCompany;
