import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../Config';

const useDashboardData = (endpoint) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [userId, setUserId] = useState('');  // State for userId
  const [role, setRole] = useState('');      // State for role
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Retrieve user info from session storage
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      console.log('UserInfo from dashboard',userInfo)
      
      const email = userInfo?.email; // Use optional chaining to avoid errors if userInfo is null

console.log('Extracted email:', email);
      // Check if userInfo exists and if it has a token
      if (!userInfo || !userInfo.token) {
        console.error('User is not authenticated. Redirecting to login.');
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }
 

      // Fetch dashboard data directly from the API
      try {
        const response = await fetch(`${BASE_URL}users/${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`, // Include token in headers
          },
        });

        const data = await response.json(); // Parse the JSON response

        // Log the API response
        console.log('Dashboard API Response:', data); // Log API response for debugging

        if (response.ok) {
          console.log('Full API Response:', data); // Log entire response for inspection
          
          const welcomeMessage = data.message; 
          setResponseMessage(welcomeMessage);
          
          // Adjust how you extract userId and role based on actual data structure
          const extractedUserId = data.userId || data.companyId; // Try using different keys based on response structure
          console.log('Extracted userId:', extractedUserId); // Log to verify the value
          
          const extractedRole = data.role || data.userRole; // Adjust key names as needed
          console.log('Extracted role:', extractedRole); // Log to verify the value
          
          // Set the values in state
          setUserId(extractedUserId);
          setRole(extractedRole);
          
          setDashboardData(data); 
        } else {
          console.error('Error fetching dashboard data:', data.message);
          setResponseMessage(data.message || 'Failed to fetch dashboard data.');
        }
      } catch (error) {
        console.error('Error during fetching dashboard data:', error);
        setResponseMessage('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchDashboardData(); 
  }, [router, endpoint]);

  return { dashboardData, responseMessage, userId, role }; 
};

export default useDashboardData;
