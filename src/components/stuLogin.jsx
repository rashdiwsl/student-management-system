import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

function StuLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "stu1" && password === "098") {
      setMessage("Login successful. Redirecting to Student Dashboard...");
      setTimeout(() => {
        navigate('/stuDash'); 
      }, 1500);
    } else {
      setMessage("Incorrect username or password. Please try again.");
    }
  };

  return (
    <div>
      <Topbar />
      <div className="login-box">
        <h1>Student Login</h1>
        <h2>Enter your credentials</h2>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="message">{message}</p>} 
      </div>
      <Footer />
    </div>
  );
}

export default StuLogin;
