// forms/AddCompany.jsx
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Alert } from 'antd';
import './style.css'; 
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
  const [showForm, setShowForm] = useState(true); 
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
      // Retrieve user info from session storage
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      
      // Check if userInfo exists and if it has a token
      if (!userInfo || !userInfo.token) {
        console.error('User is not authenticated. Redirecting to login.');
        router.push('/login'); // Redirect to login if no user info or token is found
        return;
      }

      const token = userInfo.token;
      const userId = userInfo.id; // Assuming you have the userId in the userInfo object

      console.log('token from SessionStorage', token);
      console.log('userId from sessionStorage', userId);
  
      // Make API call to add company
      const response = await fetch(`${BASE_URL}users/admin-dashboard/${userId}/add-company`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyDetails),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setAlertMessage('Company added successfully!');
        setShowAlert(true);
        
        setShowForm(false);
      
        setTimeout(() => {
          router.push('/admin-dashboard'); // Redirect to the dashboard after success
        }, 2000);
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.message || 'Failed to add company. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error); // Log any unexpected errors
      setAlertMessage('An unexpected error occurred. Please try again later.');
      setShowAlert(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container_box">
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
      {showForm && (
        <AddComForm 
          companyDetails={companyDetails}
          handleInputChange={handleInputChange}
          addCompany={addCompany}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AddCompany;
