import Topbar from './components/topbar';
import React, { useState } from 'react';
import './App.css';
import Footer from "./components/Footer";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login check (for demo purposes)
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect credentials');
    }
  };

  return (
    <div className="app">
      <Topbar />
      <main className="content">
        {!isLoggedIn && (
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
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </main>
      <Footer /> {/* Add Footer here */}
    </div>
  );
}

export default App;
