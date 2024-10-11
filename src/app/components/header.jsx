
import React from 'react';
import './style.css';

const Header = ({ role , userId }) => {
  return (
    <header className="custom-header">
      <div className="header-content">
        
        <nav className="navigation">
        <p>Welcome {role}</p>
        </nav>
        <p>User ID: {userId}</p>
      </div>
    </header>
  );
};

export default Header;
