import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUserTimes, FaListAlt, FaHistory, FaEdit, FaUser, FaSignOutAlt } from "react-icons/fa"; // Import icons
import "./adminDash.css"; // Ensure you have styles

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="sidebar">
      <h2>KDU SMS</h2>
      <ul>
        <li onClick={() => navigate("/add-student")}>
          <FaUserPlus /> Add Student
        </li>
     
        <li onClick={() => navigate("/list-student")}>
          <FaListAlt /> List Student
        </li>
        <li onClick={() => navigate("/maintain")}>
          <FaHistory /> Maintain Course History
        </li>
        <li onClick={() => navigate("/modify-courses")}>
          <FaEdit /> Modify Student Courses
        </li>
        <li onClick={() => navigate("/profile")}>
          <FaUser /> Profile
        </li>
      
      </ul>
    </div>
  );
};

export default Sidebar;
