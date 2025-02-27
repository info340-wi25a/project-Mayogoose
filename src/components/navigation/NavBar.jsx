// #1 Nav bar on the top, shared by everyone
// Logo on the left will link back to the home page
// Profile link profile.jsx
// Owner: Ellie
import React from "react";
import '../../../src/index.css';
import { Link } from 'react-router-dom';

export const NavBar = (props) => {
  return (
    <nav >
      <Link to="/" className="nav-logo">
        <img 
          src="../img/logo.svg" 
          alt="Homepage" 
        />
      </Link>
      <div className="profile">
        <Link to="/profile">
          <img 
            src="../img/profile.png" 
            alt="Profile"/>
        </Link>
      </div>
    </nav>
  );
};
