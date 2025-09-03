import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from "../../assets/images/SVG/deskkkkkkk.jpg";

import img3 from "../../assets/images/SVG/logo-navy1.webp";






const WelcomePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="welcome-container">
      <div className="welcome-left-section">
        <img
          src={images}
          alt="Welcome Illustration"
          className="welcome-illustration"
        />
      </div>
      <div className="welcome-right-section">
        <img
          src={img3}
          alt="MBank Logo"
          className="welcome-logo"
        />
        <h1 className="welcome-title">Welcome to MBank Family</h1>
        <p className="welcome-description">
          Your Account is successfully registered  please check your details below & proceed accordingly!
        </p>
        <div className="welcome-details-box">
          <p className="welcome-details-text">Name: Deepak Narwal</p>
          <p className="welcome-details-text">Employee Id: 0484429MOT</p>
          <p className="welcome-details-text">Contact: 9876543210</p>
        </div>
        <button onClick={handleContinue} className="welcome-continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;