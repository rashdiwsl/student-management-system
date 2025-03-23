import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const yearSemesters = {
  "1st Year": ["Semester 1", "Semester 2"],
  "2nd Year": ["Semester 3", "Semester 4"],
  "3rd Year": ["Semester 5", "Semester 6"],
  "4th Year": ["Semester 7", "Semester 8"]
};

function Modify() {
  const [selectedYear, setSelectedYear] = useState("1st Year"); // Default Year
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
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            Modify Student Courses
          </h1>

          {/* Dropdown List for Selecting Year */}
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "1px solid #ccc"
            }}
          >
            {Object.keys(yearSemesters).map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          {/* Semester Buttons Based on Selected Year */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            backgroundColor: "#cfcfcf",
            padding: "50px",
            borderRadius: "8px",
            maxWidth: "800px",
            margin: "auto"
          }}>
            {yearSemesters[selectedYear].map((semester, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: hoveredIndex === index ? "#004b99" : "#0066cc",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSemesterClick(`/sem${semester.split(" ")[1]}`)}
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
