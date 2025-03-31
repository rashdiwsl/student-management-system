import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./register.css";
import Topbarnew from "./Topbarnew";
import Footer from "./Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", // Track username (email)
    password: "",
    lastname: "",
    firstname: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend via a POST request
      const response = await axios.post("http://localhost:8085/register", {
        username: formData.username, // Backend receives it as "username"
        password: formData.password,
        lastname: formData.lastname,
        firstname: formData.firstname,
      });

      if (response.status === 200) {
        setSuccessMessage("Registration successful! Redirecting to login..."); // Show success message
        setTimeout(() => {
          navigate("/"); // Redirect to login page after 3 seconds
        }, 3000); // 3 seconds delay to let the user see the success message
      } else {
        console.log("Registration failed", response.data);
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("There was an error with the registration. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <Topbarnew />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Admin Register</h2>
        <input
          type="firstname"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="lastname"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="username" // Set "username" for backend, but label is "Email Address"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Show the success message if registration is successful */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <Footer />
    </div>
  );
};

export default Register;
