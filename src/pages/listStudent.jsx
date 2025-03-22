import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const students = [
  { id: "SE01", name: "RMRBD Rathnayake", email: "abc@gmail.com" },
  { id: "SE02", name: "RM Rathnayake", email: "abc@gmail.com" },
  { id: "SE03", name: "Rathnayake", email: "abc@gmail.com" },
  { id: "SE04", name: "MRBD Rathnasekara", email: "abc@gmail.com" },
  { id: "SE05", name: "SP Sasuni", email: "abc@gmail.com" },
];

function ListStudent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    padding: "20px",
    minHeight: "100vh",
    textAlign: "center",
    paddingTop: "90px", // Adjusted to prevent overlap with Topbar
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
    textAlign: "center", // Keep other columns centered
  };

  const nameTdStyle = {
    ...tdStyle,
    textAlign: "left", // Left-align only the Name column
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div style={containerStyle}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
            List Student
          </h1>
          <input
            type="text"
            placeholder="Search by Student ID"
            style={inputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Student ID</th>
                  <th style={thStyle}>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td style={nameTdStyle}>{student.name}</td> {/* Left-aligned */}
                    <td style={{ ...tdStyle, fontWeight: "bold" }}>{student.id}</td>
                    <td style={tdStyle}>{student.email}</td>
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

export default ListStudent;
