import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminDash.css"; // Custom styles
import logo from "../assets/logo.png"; // Adjust the path as needed


function AdminDashboard() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="container">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="main-content">
        <div className="grid-container">
          <div className="card card1">
            <h2>Welcome to SMS</h2>
            <p>Department of Computer Science</p>
          </div>

          <div className="card card2">
            <img src={logo} alt="University Logo" className="university-logo" />
            <p>Go to University Website</p>
            <button
              className="card-button"
              onClick={() => window.open("https://kdu.ac.lk/", "_blank")}
            >
              Click Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;