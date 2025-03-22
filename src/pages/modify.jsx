import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const semesters = [
  "Semester 1", "Semester 2", "Semester 3",
  "Semester 4", "Semester 5", "Semester 6",
  "Semester 7", "Semester 8"
];

function Modify() {
  const [hoveredIndex, setHoveredIndex] = useState(null);  // Track hovered button
  const navigate = useNavigate();  // Initialize navigate function

  const handleSemesterClick = (semester) => {
    // Navigate to the corresponding semester page
    const semesterPage = semester.toLowerCase().replace(" ", ""); // Convert to lowercase and remove spaces
    navigate(`/${semesterPage}`);  // Navigate to the semester page dynamically
  };

  const containerStyle = {
    padding: "20px",
    minHeight: "100vh",
    textAlign: "center",
    paddingTop: "80px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const boxContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    backgroundColor: "#e6e6e6",
    padding: "50px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "auto",
  };

  const buttonStyle = (isHovered) => ({
    backgroundColor: isHovered ? "#004b99" : "#0066cc", // Change color when hovered
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease", // Smooth transition
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div style={containerStyle}>
          <h1 style={titleStyle}>Modify Student Courses</h1>
          <div style={boxContainerStyle}>
            {semesters.map((semester, index) => (
              <button
                key={index}
                style={buttonStyle(index === hoveredIndex)} // Apply hover style conditionally
                onMouseEnter={() => setHoveredIndex(index)} // Set hover on enter
                onMouseLeave={() => setHoveredIndex(null)} // Remove hover on leave
                onClick={() => handleSemesterClick(semester)}  // Handle button click for navigation
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
