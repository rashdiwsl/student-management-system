import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css"; 

const Sidebarnew = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="sidebar">
      <h2>KDU SMS</h2>
      <ul>
        <li onClick={() => navigate("/viewCourse")}>View Course</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/")}>Log out</li>
      </ul>
    </div>
  );
};

export default Sidebarnew;
