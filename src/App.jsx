import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import AdminDashboard from "./components/adminDash";
import AddStudent from "./pages/addStudent";
import RemoveStudent from "./pages/removeStudent";
import ListStudent from "./pages/listStudent";
import ModifyCourses from "./pages/modify";
import Profile from "./pages/profile";
import MaintainCourses from "./pages/maintain";
import Login from "./components/login"; // Ensure this exists

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dash" element={<AdminDashboard />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/remove-student" element={<RemoveStudent />} />
            <Route path="/list-student" element={<ListStudent />} />
            <Route path="/course-history" element={<MaintainCourses />} />
            <Route path="/modify-courses" element={<ModifyCourses />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
