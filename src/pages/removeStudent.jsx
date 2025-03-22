import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const RemoveStudent = () => {
  const [formData, setFormData] = useState({
    idNo: "",
    degreeProgram: "",
    reason: "",
  });

  const [hoverRemove, setHoverRemove] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemove = () => {
    alert("Student Removed Successfully!");
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
    top: "50px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "80px", // Ensure content doesn't overlap with Topbar
  };

  const cardStyle = {
    backgroundColor: "#e6e6e6",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "600px", // Reduced width
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const formGroupStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const labelStyle = {
    fontWeight: "bold",
    flex: "1",
    marginRight: "10px",
  };

  const inputStyle = {
    flex: "2",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const textareaStyle = {
    flex: "2",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "80px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  };

  const removeButtonStyle = {
    backgroundColor: hoverRemove ? "#e04f3f" : "red", // Darker red on hover
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth transition for hover effect
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <Topbar />
        <div style={cardStyle}>
          <h1 style={titleStyle}>Remove Student</h1>
          <div>
            <form>
              <div style={formGroupStyle}>
                <label style={labelStyle}>ID Number</label>
                <input
                  type="text"
                  name="idNo"
                  style={inputStyle}
                  value={formData.idNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Degree Program</label>
                <input
                  type="text"
                  name="degreeProgram"
                  style={inputStyle}
                  value={formData.degreeProgram}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Reason</label>
                <textarea
                  name="reason"
                  style={textareaStyle}
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={buttonContainerStyle}>
                <button
                  type="button"
                  style={removeButtonStyle}
                  onClick={handleRemove}
                  onMouseEnter={() => setHoverRemove(true)} // Set hover state
                  onMouseLeave={() => setHoverRemove(false)} // Reset hover state
                >
                  Remove Student
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RemoveStudent;
