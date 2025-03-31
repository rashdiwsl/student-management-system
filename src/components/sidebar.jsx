
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserPlus,
  FaUserTimes,
  FaListAlt,
  FaHistory,
  FaEdit,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./adminDash.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  // Define your menu items with their paths
  const menuItems = [
    { path: "/add-student", icon: <FaUserPlus />, label: "Add Student" },
    { path: "/list-student", icon: <FaListAlt />, label: "List Student" },
    {
      path: "/course-history",
      icon: <FaHistory />,
      label: "Maintain Course History",
    },
    {
      path: "/modify-courses",
      icon: <FaEdit />,
      label: "Modify Student Courses",
    },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
  ];

  return (
    <div className="sidebar">
      <h2>KDU SMS</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
