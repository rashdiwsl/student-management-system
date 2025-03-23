import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/Topbar";
import AdminDash from "./components/AdminDash";
import AddStudent from "./pages/addStudent";
import RemoveStudent from "./pages/removeStudent";
import ListStudent from "./pages/listStudent";
import Modify from "./pages/modify";
import Profile from "./pages/profile";
import Login from "./components/login";
import Maintain from "./pages/maintain";
import Sem1 from "./pages/sem1";
import Sem2 from "./pages/Sem2";
import Sem3 from "./pages/sem3";
import Sem4 from "./pages/sem4";
import Sem5 from "./pages/sem5";
import Sem6 from "./pages/sem6";
import Sem7 from "./pages/sem7";
import Sem8 from "./pages/sem8";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page (No Sidebar/Topbar) */}
        <Route path="/" element={<Login />} />

        {/* Routes that require Sidebar and Topbar */}
        <Route
          path="/*"
          element={
            <div className="app-container flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1">
                <Topbar />
                <div style={{ padding: "20px", paddingTop: "80px" }}>
                  <Routes>
                    <Route path="/admindash" element={<AdminDash />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/remove-student" element={<RemoveStudent />} />
                    <Route path="/list-student" element={<ListStudent />} />
                    <Route path="/course-history" element={<Maintain />} />
                    <Route path="/modify-courses" element={<Modify />} />
                    <Route path="/profile" element={<Profile />} />
                    
                    {/* Semester Pages */}
                    <Route path="/sem1" element={<Sem1 />} />
                    <Route path="/sem2" element={<Sem2 />} />
                    <Route path="/sem3" element={<Sem3 />} />
                    <Route path="/sem4" element={<Sem4 />} />
                    <Route path="/sem5" element={<Sem5 />} />
                    <Route path="/sem6" element={<Sem6 />} />
                    <Route path="/sem7" element={<Sem7 />} />
                    <Route path="/sem8" element={<Sem8 />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
