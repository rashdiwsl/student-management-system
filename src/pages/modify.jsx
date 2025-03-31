import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const semesters = [
  "Semester 1", "Semester 2", "Semester 3", "Semester 4", 
  "Semester 5", "Semester 6", "Semester 7", "Semester 8"
];

function Modify() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleSemesterClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div style={{ padding: "20px", minHeight: "100vh", textAlign: "center", paddingTop: "80px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "30px", color: "#333" }}>
            Modify Student Courses
          </h1>

          {/* Semester Buttons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Flexibility for mobile
            gap: "30px",
            backgroundColor: "#ffffff",
            padding: "50px",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "900px",
            margin: "auto",
            transition: "all 0.3s ease",
          }}>
            {semesters.map((semester, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: hoveredIndex === index ? "#0074cc" : "#0066cc",
                  color: "white",
                  padding: "20px 25px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.3s ease, background-color 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSemesterClick(`/sem${semester.split(" ")[1]}`)}
                onFocus={(e) => e.target.style.transform = "scale(1.05)"}
                onBlur={(e) => e.target.style.transform = "scale(1)"}
              >
                {semester}
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Modify;
