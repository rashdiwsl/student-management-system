import React from "react";
import logo from "../assets/logo.png"; // Adjust path as needed

function Topbar() {
  const topbarStyle = {
    backgroundColor: "#1e88e5", // Blue
    padding: "0.5rem 2rem",
    height: "50px",
    display: "flex",
    alignItems: "center",
    color: "white",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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

  return (
    <header style={topbarStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <h2 style={titleStyle}>Faculty Of Computing</h2>
    </header>
  );
}

export default Topbar;
