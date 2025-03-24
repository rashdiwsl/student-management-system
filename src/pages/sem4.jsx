import React, { useState } from "react";
import Footer from "../components/Footer";


const Sem4 = () => {
  const [courses, setCourses] = useState([
    { id: "SE4040", name: "Software Engineering" },
    { id: "CS4050", name: "Database Management Systems" },
    { id: "MA4060", name: "Probability and Statistics" },
  ]);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

  const addCourse = () => {
    if (courseId.trim() !== "" && courseName.trim() !== "") {
      setCourses([...courses, { id: courseId, name: courseName }]);
      setCourseId("");
      setCourseName("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", minHeight: "100vh", marginTop: "80px" }}>
      <div style={{ background: "#ddd", padding: "20px", borderRadius: "5px", maxWidth: "600px", margin: "auto" }}>
        <h2>Semester 4</h2>
        
        {/* Input Fields */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <input
            type="text"
            placeholder="Course"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            style={{ flex: 2, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          <button
            onClick={addCourse}
            style={{
              padding: "10px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Table Displaying Courses */}
      <table style={{ width: "80%", margin: "20px auto", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Course ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? "#fff" : "#dbd9d9" }}>
              <td style={{ padding: "10px", fontWeight: "bold" }}>{course.id}</td>
              <td style={{ padding: "10px" }}>{course.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Sem4;
