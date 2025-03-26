import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  // Allowed users
  const validUsers = {
    "admin1": "123"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validUsers[username] && validUsers[username] === password) {
      setMessage("Login successful.");

      setTimeout(() => {
        if (username === "admin1") {
          navigate('/adminDash'); // Navigate to admin dashboard
        }
        setMessage(''); // Clear message after navigation
      }, 1500); // Delay navigation for 1.5 seconds to show the message
    } else {
      setMessage('Incorrect credentials. Please try again.');
    }
  };

  const handleStudentLoginRedirect = () => {
    navigate('/stuLogin'); // Navigate to the student login page
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the state for password visibility
  };

  return (
    <div>
      <Topbar />
      <div className="login-box">
        <h1>KDU SMS</h1>
        <h2>LOGIN</h2>
        <p>Login to your Account</p>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Enter your username"
              />
              <i className="fas fa-user"></i> {/* FontAwesome User Icon */}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Enter your password"
              />
              <i 
                className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} 
                onClick={togglePasswordVisibility} 
                style={{ cursor: 'pointer' }} 
              ></i> {/* Eye Icon to toggle password visibility */}
            </div>
          </div>
          <div className="forgot-password">
            Forgot Password? <a href="/forgot-password">Click Here</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>

      {/* Student Login Button outside of the login box */}
      <div className="student-login-outside">
        <button onClick={handleStudentLoginRedirect} className="student-login-button">
          Student Login
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
