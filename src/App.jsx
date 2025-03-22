import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import AdminDash from "./components/adminDash";
import AddStudent from "./pages/addStudent";
import RemoveStudent from "./pages/removeStudent";
import ListStudent from "./pages/listStudent";
import Modify from "./pages/modify";
import Profile from "./pages/profile";
import Login from "./components/login"; // Ensure this exists
import Maintain from "./pages/maintain";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admindash" element={<AdminDash />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/remove-student" element={<RemoveStudent />} />
            <Route path="/list-student" element={<ListStudent />} />
            <Route path="/course-history" element={<Maintain />} />
            <Route path="/modify-courses" element={<Modify />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
