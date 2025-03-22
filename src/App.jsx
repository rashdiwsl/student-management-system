import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import AdminDash from "./components/adminDash";
import StuDash from "./components/stuDash";
import AddStudent from "./pages/addStudent";
import ListStudent from "./pages/listStudent";
import Maintain from "./pages/maintain";
import Modify from "./pages/modify";
import Profile from "./pages/profile";
import RemoveStudent from "./pages/removeStudent";
import Login from "./components/login";
import "./App.css";

function App() {
  return (
    <Router>
      <Topbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dash" element={<AdminDash />} />
          <Route path="/stu-dash" element={<StuDash />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/list-student" element={<ListStudent />} />
          <Route path="/maintain" element={<Maintain />} />
          <Route path="/modify" element={<Modify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/remove-student" element={<RemoveStudent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
