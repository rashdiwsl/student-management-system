import React, { useState } from "react";

const Sem1 = () => {
  const [courses, setCourses] = useState([
    { id: "SE3032", name: "Software Construction Technologies and Tools" },
    { id: "CS3092", name: "Computer and Network Security" },
    { id: "SE3022", name: "Software Modeling" },
  ]);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

  const addCourse = () => {
    if (courseId && courseName) {
      setCourses([...courses, { id: courseId, name: courseName }]);
      setCourseId("");
      setCourseName("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", background: "#f2f6fc" }}>
      <div style={{ background: "#ddd", padding: "20px", borderRadius: "5px" }}>
        <h2>Semester 5</h2>
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ccc" }}
        />
        <button
          onClick={addCourse}
          style={{ padding: "10px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Add Course
        </button>
      </div>
      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Course ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? "#fff" : "#f2f2f2" }}>
              <td style={{ padding: "10px", fontWeight: course.id === "SE3022" ? "bold" : "normal" }}>{course.id}</td>
              <td style={{ padding: "10px" }}>{course.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sem1;
