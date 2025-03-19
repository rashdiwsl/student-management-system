import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import AdminDash from './components/adminDash';
import StuDash from './components/stuDash';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Allowed users
  const validUsers = {
    "admin1": "123",
    "stu1": "098"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validUsers[username] && validUsers[username] === password) {
      setMessage("Login successful.");

      setTimeout(() => {
        if (username === "admin1") {
          navigate('/adminDash');
        } else if (username === "stu1") {
          navigate('/stuDash');
        }
        setMessage(''); // Clear message after navigation
      }, 1500); // Delay navigation for 1.5 seconds to show the message
    } else {
      setMessage('Incorrect credentials. Please try again.');
    }
  };

  return (
    <div>
      {message && <div className="message-box">{message}</div>} {/* Display message in a separate box */}
      <div className="login-box">
        <h1>KDU SMS</h1>
        <h1>LOGIN</h1>
        <h2>Login to your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            Forgot Password? <a href="/forgot-password">Click Here</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Topbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/stuDash" element={<StuDash />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
