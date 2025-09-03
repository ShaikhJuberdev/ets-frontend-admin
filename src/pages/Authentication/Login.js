import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/images/SVG/ETS_logo 2.svg'


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();


  const defaultUsername = "Admin@gmail.com";
  const defaultPassword = "Admin@123";



  const handleLogin = (e) => {

    e.preventDefault();

    let newErrors = { username: "", password: "" };
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // Stop if validation fails
    if (newErrors.username || newErrors.password) return;
    console.log('HandleLogin called');
    e.preventDefault();
    if (username === defaultUsername && password === defaultPassword) {
      console.log('Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
      sessionStorage.setItem("auth", JSON.stringify({
        username: defaultUsername,
        password: defaultPassword,
      }))
    } else {
      console.log('Invalid credentials');
      setErrors({ ...newErrors, password: "Invalid username or password!" });
    }
  };



  return (

    <div
      className="d-flex justify-content-center align-items-center min-vh-100 login_bg"
    
    >
      <div
        className="card shadow"
        style={{ width: "400px", borderRadius: "6px", overflow: "hidden" }}
      >
        {/* Top Header */}
        <div
          style={{
            backgroundColor: "#0d1117",
            padding: "20px",
            textAlign: "center",

          }}
        >
          <img src={Logo} alt="logo" style={{ width: "150px", filter: "brightness(50)" }} />
        </div>

        {/* Login Form */}
        <div className="card-body">
          <h6 className="fw-bold mb-3">Log in</h6>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="email"
                className="form-control"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <small className="text-danger">{errors.username}</small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="small" style={{ color: "#888" }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#888", color: "white" }}
            >
              Login
            </button>
          </form>




        </div>
      </div>
    </div>
  );
};

export default Login
