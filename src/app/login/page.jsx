"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './loginstyle.css';
import { storeUserInfo } from '../db'; // Import IndexedDB utility

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send a POST request to your backend login API
      const response = await fetch('https://admin-4-hoom.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse JSON response
      console.log('API Response:', data); // Log the entire response 

      if (response.ok) {
        console.log('User Role from Login:', data.role); // Log the role

        // Store token and user info in IndexedDB
        await storeUserInfo({
          token: data.token, // Store token
          role: data.role,   // Store role
          email: email,      // Store email
        });
        setResponseMessage('Login successful!');

        // Redirect based on user role
        if (data.role === 'admin') {
          router.push('/admin-dashboard'); // Redirect to admin dashboard
        } else if (data.role === 'user') {
          router.push('/company-dashboard'); // Redirect to company dashboard
        } else {
          setResponseMessage('Invalid user role.');
        }
      } else {
        setResponseMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container bg-white">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col">
        <div className="form-group">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="submit-button"  disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
        </button>
        
      </form>
      {/* Display response message */}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default Login;