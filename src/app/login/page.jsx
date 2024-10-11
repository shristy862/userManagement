"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './loginstyle.css';
import LoginForm from '../Forms/login_form'
import { BASE_URL } from '../../Config';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const router = useRouter();

  const handleFlip = () => {
    setIsSignup(!isSignup);
    setName('');
    setEmail(''); 
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        const userRole = data.user.role; 
        const userId = data.user.id; 
        const token = data.token; // Get the token from the response
        console.log('Token:', token);

        const userInfo = {
          token: token,
          role: userRole,
          email: email, 
          id: userId,
          
        };

        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log('User Info from sessionStorage:', userInfo);
        
        setResponseMessage('Login successful!');

        // Redirect based on user role
        if (userRole === 'admin') {
          router.push('/admin-dashboard');
        } else if (userRole === 'company') {
          router.push('/company-dashboard');
        } else {
          setResponseMessage('Invalid user role.');
        }
      } else {
        setResponseMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setResponseMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ name, email, password });
    try {
      const response = await fetch(`${BASE_URL}users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log('Signup Response:', data); 
      if (response.ok) {
        setResponseMessage('Signup successful! Please log in.');
        handleFlip(); 
      } else {
        setResponseMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setResponseMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="front">
      <LoginForm
        handleLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        responseMessage={responseMessage}
        handleFlip={handleFlip}
        handleSignup={handleSignup}
        isSignup={isSignup} 
        name={name} 
        setName={setName}
      />

    </div>
  );
};

export default Login;