import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Footer from "../components/Footer";
import Topbarnew from "./Topbarnew";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };

    fetch("http://localhost:8085/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          console.log("Login successful:", data);
          localStorage.setItem("authToken", data.token);
          setMessage("Login successful.");
          navigate("/adminDash");
        } else {
          setMessage("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setMessage("Login failed. Please check your username and password.");
      });
  };

  const handleStudentLoginRedirect = () => {
    navigate("/stuLogin");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Topbarnew />
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
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Enter your password"
              />
              <i
                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="register-link">
          <p>
            Don't have an account? <a href="/register" className="register-text">Register</a>
          </p>
        </div>
      </div>

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
