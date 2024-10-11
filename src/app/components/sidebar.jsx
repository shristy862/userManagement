import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import { useRouter } from 'next/navigation'; // Import useRouter
import './style.css'; // Import the CSS for custom styles

const Sidebar = ({ role }) => { // Accept role as a prop
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const router = useRouter(); // Initialize useRouter

  const changeTheme = (value) => setTheme(value ? 'dark' : 'light');
  
  const onClick = (e) => {
    setCurrent(e.key);

    if (e.key === 'sub5') {
      // Handle logout functionality
      sessionStorage.removeItem('token'); // Clear the token
      sessionStorage.removeItem('userInfo'); // Clear user info if necessary
      router.push('/login'); // Redirect to login page
    }
    if (e.key === '9') {
      
      onViewCompaniesClick();
    }
  };

  // Define the sidebar items
  const items = [
    {
      key: 'sub1',
      label: 'Contact Us',
      icon: <MailOutlined />,
      children: [
        { key: '1', label: 'Message' },
        { key: '2', label: 'Email Us' },
      ],
    },
    {
      key: 'sub2',
      label: 'Menu',
      icon: <AppstoreOutlined />,
      children: [
        { key: '3', label: 'Option 5' },
        { key: '4', label: 'Option 6' },
      ],
    },
    {
      key: 'sub4',
      label: 'Settings',
      icon: <SettingOutlined />,
      children: [
        // Conditionally render the "View Added Companies" item based on role
        role === 'admin' && { key: '9', label: 'View Added Companies' },
      ].filter(Boolean), // Filter out any false values
    },
    {
      key: 'sub5',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="sidebar-container">
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ flex: 1 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div className="sidebar-footer">
        <Switch
          checked={theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
    </div>
  );
};

export default Sidebar;
