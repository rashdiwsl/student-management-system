import React from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="page-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
