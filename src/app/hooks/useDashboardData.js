import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '../db'; // Adjust the path if necessary

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoFromDB = await getUserInfo();

      if (!userInfoFromDB || !userInfoFromDB.token) {
        router.push('/login'); // Redirect to login if no token found
        return;
      }

      setUserInfo(userInfoFromDB);
      fetchDashboardData(userInfoFromDB.token);
    };

    const fetchDashboardData = async (token) => {
      try {
        const response = await fetch('https://admin-4-hoom.onrender.com/api/auth/admin-dashboard', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Dashboard Data:', data); // Log the fetched dashboard data
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

  return { dashboardData, userInfo };
};

export default useDashboardData;
