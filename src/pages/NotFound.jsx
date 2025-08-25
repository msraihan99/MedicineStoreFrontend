// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="ghost">
        <div className="ghost-face">
          <div className="eye"></div>
          <div className="eye right"></div>
          <div className="mouth"></div>
        </div>
      </div>
      <h1 className="title">404 - Page Not Found</h1>
      <p className="subtitle">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-button">Back to Home</Link>
    </div>
  );
};

export default NotFound;
