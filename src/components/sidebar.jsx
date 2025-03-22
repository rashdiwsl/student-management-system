import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminDash.css"; // Ensure you have styles

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="sidebar">
      <h2>KDU SMS</h2>
      <ul>
        <li onClick={() => navigate("/add-student")}>Add Student</li>
        <li onClick={() => navigate("/remove-student")}>Remove Student</li>
        <li onClick={() => navigate("/list-student")}>List Student</li>
        <li onClick={() => navigate("/course-history")}>Maintain Course History</li>
        <li onClick={() => navigate("/modify-courses")}>Modify Student Courses</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/")}>Log out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
