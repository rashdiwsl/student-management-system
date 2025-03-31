import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function RemoveStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleRemoveStudent = async (email) => {
    try {
      const response = await fetch("http://localhost:8085/removeStudent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove student");
      }

      setStudents(students.filter((student) => student.email !== email));
      alert(`Student with email ${email} removed successfully!`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", marginLeft: "200px" }}>
        <Topbar />
        <div style={{ padding: "20px", marginTop: "60px", height: "calc(100vh - 120px)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", padding: "20px", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "24px", color: "#2c3e50", margin: 0 }}>Remove Students</h1>
              <input
                type="text"
                placeholder="Search students by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>

            {loading && <div style={{ textAlign: "center", padding: "20px" }}>Loading students...</div>}
            {error && <div style={{ color: "red", textAlign: "center", padding: "20px" }}>Error: {error}</div>}

            {!loading && !error && (
              <div style={{ flex: 1, overflow: "auto", marginTop: "10px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#2c3e50", color: "white", padding: "12px 15px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0 }}>First Name</th>
                      <th style={{ backgroundColor: "#2c3e50", color: "white", padding: "12px 15px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0 }}>Last Name</th>
                      <th style={{ backgroundColor: "#2c3e50", color: "white", padding: "12px 15px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0 }}>Email</th>
                      <th style={{ backgroundColor: "#2c3e50", color: "white", padding: "12px 15px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0 }}>Degree Programme</th>
                      <th style={{ backgroundColor: "#2c3e50", color: "white", padding: "12px 15px", textAlign: "left", fontWeight: "500", position: "sticky", top: 0 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter((student) =>
                        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((student, index) => (
                        <tr key={index}>
                          <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd", textAlign: "left" }}>{student.firstName}</td>
                          <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd", textAlign: "left" }}>{student.lastName}</td>
                          <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd", textAlign: "left" }}>{student.email}</td>
                          <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd", textAlign: "left" }}>{student.degreePrograme}</td>
                          <td style={{ padding: "12px 15px", borderBottom: "1px solid #ddd", textAlign: "left" }}>
                            <button style={{ backgroundColor: "red", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }} onClick={() => handleRemoveStudent(student.email)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default RemoveStudent;
