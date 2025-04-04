import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 
import logo from "../assets/logo.png"; 

function Topbar() {
  const navigate = useNavigate(); // Initialize navigation

  const topbarStyle = {
    background: "linear-gradient(to right, #0f172a, #1b3a57)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "0.5rem 2rem",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Add space between logo and the log out button
    color: "white",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
  };

  const logoStyle = {
    width: "40px", // Adjust logo size
    height: "40px",
    marginRight: "10px",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  const logoutContainerStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#b22222", // Pick Red color
    transition: "color 0.3s", // Smooth color change on hover
  };

  const logoutTextStyle = {
    marginLeft: "8px", // Space between icon and text
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <header style={topbarStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <h2 style={titleStyle}>Faculty Of Computing</h2>
      </div>
      <div
        style={logoutContainerStyle}
        onClick={() => {
          localStorage.removeItem("authToken"); // Clear JWT token from local storage
          navigate("/"); // Redirect to home page
        }}
        onMouseEnter={(e) => (e.target.style.color = "#8b0000")}
        onMouseLeave={(e) => (e.target.style.color = "#ed2d2d")}
      >
        <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
        <span style={logoutTextStyle}>Log out</span>
      </div>
    </header>
  );
}

export default Topbar;
