import React from "react";

function Footer() {
  const footerStyle = {
    background: "linear-gradient(to right, #0f172a, #1b3a57)", 
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
    color: "white",
    textAlign: "center",
    padding: "0.8rem",
    height: "40px",
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
    boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "0.9rem",
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} KDU SMS</p>
    </footer>
  );
}

export default Footer;
