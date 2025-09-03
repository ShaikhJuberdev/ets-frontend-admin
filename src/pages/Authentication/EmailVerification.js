



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import images from "../../assets/images/SVG/Desk_login2.svg";
import img2 from "../../assets/images/SVG/logo-navy1.webp";

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(58);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setError('Please enter a 4-digit OTP');
      toast.error('Please enter a 4-digit OTP');
      return;
    }
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      if (response.ok) {
        toast.success('Email verified successfully!');
        setError('');
        setTimeout(() => {
          navigate('/welcomepage');
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP');
      toast.error('Error verifying OTP');
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      toast.info('OTP resent successfully!');
      setOtp(['', '', '', '']);
      setError('');
      setTimer(58);
    }
  };

  return (
    <div className="verification-container">
      <div className="verification-left-section"></div>

      <div className="verification-right-section">
        <div className="verification-logo-box">
          <img src={img2} alt="MBank Logo" className="verification-logo" />
        </div>
        <h1 className="verification-title">Email Verification</h1>
        <p className="verification-description">
          Enter the 4-digit OTP sent to the registered email id XXXXXXXXX@mbank.com
        </p>
        <div className="verification-otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="verification-otp-input"
            />
          ))}
        </div>

        {error && <p className="verification-error">{error}</p>}

        <div className="verification-timer-resend">
          <span className="verification-timer">
            00:{timer.toString().padStart(2, '0')}
          </span>
          <button
            onClick={handleResend}
            className="verification-resend-link"
            disabled={timer > 0}
          >
            Resend Code?
          </button>
        </div>

        <button onClick={handleVerify} className="verification-verify-button">
          Verify Email Address
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default EmailVerification;

