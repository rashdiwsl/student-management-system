import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import UpdateStudent from "./updateStudent";

function ListStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8085/getStudents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.statusText}`);
        }

        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.email} ${student.degreeProgram}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsUpdateDialogOpen(true);
  };

  const handleStudentUpdated = (updatedStudent) => {
    if (updatedStudent === null) {
      // Student was deleted
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
    } else {
      // Student was updated
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
    }
    setIsUpdateDialogOpen(false);
  };

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: "200px",
  };

  const mainContentStyle = {
    padding: "20px",
    marginTop: "60px",
    height: "calc(100vh - 120px)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexShrink: 0,
  };

  const inputStyle = {
    padding: "10px",
    width: "300px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  };

  const tableContainerStyle = {
    flex: 1,
    overflow: "auto",
    marginTop: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  };

  const thStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: "500",
    position: "sticky",
    top: 0,
  };

  const tdStyle = {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  };

  const trHoverStyle = {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <Topbar />
        <div style={mainContentStyle}>
          <div style={cardStyle}>
            <div style={headerStyle}>
              <h1 style={{ fontSize: "24px", color: "#2c3e50", margin: 0 }}>
                List Students
              </h1>
              <input
                type="text"
                placeholder="Search students..."
                style={inputStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                Loading students...
              </div>
            )}

            {error && (
              <div
                style={{ color: "red", textAlign: "center", padding: "20px" }}
              >
                Error: {error}
              </div>
            )}

            {!loading && !error && (
              <div style={tableContainerStyle}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>First Name</th>
                      <th style={thStyle}>Last Name</th>
                      <th style={thStyle}>Address</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Date of Birth</th>
                      <th style={thStyle}>Degree Programme</th>
                      <th style={thStyle}>Enrolled Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(student)}
                          style={trHoverStyle}
                        >
                          <td style={tdStyle}>{student.firstName}</td>
                          <td style={tdStyle}>{student.lastName}</td>
                          <td style={tdStyle}>{student.address}</td>
                          <td style={tdStyle}>{student.email}</td>
                          <td style={tdStyle}>
                            {new Date(student.dob).toLocaleDateString()}
                          </td>
                          <td style={tdStyle}>{student.degreeProgram}</td>
                          <td style={tdStyle}>{student.enrolledCourse}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            ...tdStyle,
                            textAlign: "center",
                            color: "#666",
                          }}
                        >
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>

      {isUpdateDialogOpen && (
        <UpdateStudent
          student={selectedStudent}
          open={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onUpdate={handleStudentUpdated}
        />
      )}
    </div>
  );
}

export default ListStudent;