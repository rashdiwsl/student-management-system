import React from "react";

function Footer() {
  const footerStyle = {
    backgroundColor: "#263238",
    color: "white",
    textAlign: "center",
    padding: "0.8rem",
    height: "30px",
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
