import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const Sem1 = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8085/getCourse");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async () => {
    if (!courseId.trim() || !courseName.trim()) {
      setErrorMessage("Both fields are required.");
      setSuccessMessage("");
      return;
    }

    try {
      const newCourse = { courseId, courseName };
      await axios.post("http://localhost:8085/addCourse", newCourse);
      setSuccessMessage("Course added successfully!");
      setErrorMessage("");
      setCourseId("");
      setCourseName("");
      fetchCourses(); // Refresh the course list after adding a new course
    } catch (error) {
      setErrorMessage("Error adding course. Please try again.");
      setSuccessMessage("");
      console.error("Error adding course:", error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: "200px" }}>
        <Topbar />
        <div style={{ padding: "20px", marginTop: "60px", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "900px" }}>
            <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "600", color: "#2c3e50" }}>Semester 1 Courses</h1>

            {successMessage && <div style={{ backgroundColor: "#dff0d8", color: "#3c763d", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>{successMessage}</div>}
            {errorMessage && <div style={{ backgroundColor: "#f2dede", color: "#a94442", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>{errorMessage}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
              <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              />
              <button
                onClick={addCourse}
                style={{ gridColumn: "span 2", padding: "12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
              >
                Add Course
              </button>
            </div>

            {/* Scrollable Table */}
            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "4px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#007bff", color: "white" }}>
                    <th style={{ padding: "10px", textAlign: "left", width: "30%" }}>Course ID</th>
                    <th style={{ padding: "10px", textAlign: "left", width: "70%" }}>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} style={{ background: index % 2 === 0 ? "#fff" : "#f7f7f7" }}>
                      <td style={{ padding: "10px" }}>{course.courseId}</td>
                      <td style={{ padding: "10px" }}>{course.courseName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Sem1;
