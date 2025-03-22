import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const courses = [
  { id: "C001", semester: "Fall 2024", lastUpdate: "2025-03-20" },
  { id: "C002", semester: "Spring 2025", lastUpdate: "2025-03-18" },
  { id: "C003", semester: "Summer 2025", lastUpdate: "2025-03-15" },
];

function Maintain() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    padding: "20px",
    minHeight: "100vh",
    textAlign: "center",
    paddingTop: "90px", // Prevents overlap with Topbar
  };

  const inputStyle = {
    padding: "8px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  };

  const tableContainerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#0074cc",
    color: "white",
    padding: "12px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  };

  const leftAlignTdStyle = {
    ...tdStyle,
    textAlign: "left", // Left-align Course ID & Semester
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div style={containerStyle}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
            Maintain Courses
          </h1>
        
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Course ID</th>
                  <th style={thStyle}>Semester</th>
                  <th style={thStyle}>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td style={leftAlignTdStyle}>{course.id}</td>
                    <td style={leftAlignTdStyle}>{course.semester}</td>
                    <td style={tdStyle}>{course.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Maintain;
