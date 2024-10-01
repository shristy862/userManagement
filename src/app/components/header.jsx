
import React from 'react';
import './style.css';

const Header = ({ userInfo }) => {
  return (
    <header className="custom-header">
      <div className="header-content">
        
        <nav className="navigation">
          {userInfo && <p>Welcome, {userInfo.role}!</p>}
           
        </nav>
      </div>
    </header>
  );
};

export default Header;
