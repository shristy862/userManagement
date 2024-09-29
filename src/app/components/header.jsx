
import React from 'react';
import './style.css';

const Header = ({ userInfo, dashboardMessage }) => {
  return (
    <header className="custom-header">
      <div className="header-content">
        <h1 className="logo">{dashboardMessage && <p>{dashboardMessage}</p>}</h1>
        <nav className="navigation">
          {userInfo && <p>Welcome, {userInfo.role}!</p>}
           
        </nav>
      </div>
    </header>
  );
};

export default Header;
