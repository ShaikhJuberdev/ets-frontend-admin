import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import images from "../../assets/images/SVG/Desk_login3_1.svg";
import img1 from "../../assets/images/SVG/logo-navy1.webp";

const START_POINT = "https://howzit.observanteye.com/";

const Register = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleGetOTP = async () => {
    if (!email) {
      setError('Please enter an email address');
      toast.error('Please enter an email address');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the Terms & Conditions');
      toast.error('Please accept the Terms & Conditions');
      return;
    }

    try {
      const response = await fetch(`${START_POINT}v1/accounts/sms/code2/prathamnagulwar45@gmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Raw Response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('OTP Response:', data);
        toast.success('OTP sent successfully!');
        setError('');

        setTimeout(() => {
          navigate('/emailverification');
        }, 1600);
      } else {
        const errMsg = await response.text();
        console.error('Server returned error:', errMsg);
        toast.error('Failed to send OTP');
        setError(`Failed to send OTP: ${errMsg}`);
      }
    } catch (err) {
      console.error('Network or code error:', err);
      toast.error(`Error sending OTP`);
      setError(`Error sending OTP: ${err.message}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left-section">
        {/* You can add an image or illustration here if needed */}
      </div>

      <div className="right-section">
        <div className="logo-section">
          <img
            src={img1}
            alt="MBank Logo"
            className="logo"
          />
        </div>

        <h1 className="title">Let's get Started!!</h1>

        <div className="form-container">
          <div className="input-button-combo">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button onClick={handleGetOTP} className="otp-button">
              Get OTP
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="terms-container">
            <input
              type="checkbox"
              id="terms"
              className="terms-checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms" className="terms-label">
              I agree to all <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
            </label>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
