import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    idNo: "",
    degreeProgram: "",
    enrolledCourses: "",
  });

  const [hoverRegister, setHoverRegister] = useState(false);
  const [hoverNotify, setHoverNotify] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data Submitted:", formData);
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
    backgroundColor: "#d9d9d9",
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

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    gap: "15px",
  };

  const registerButtonStyle = {
    backgroundColor: hoverRegister ? "#45a049" : "green", // Darker green on hover
    color: "white",
    padding: "8px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth transition for hover effect
  };

  const notifyButtonStyle = {
    backgroundColor: hoverNotify ? "#007bb5" : "blue", // Darker blue on hover
    color: "white",
    padding: "8px 16px",
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
          <h1 style={titleStyle}>Add Student</h1>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                name="firstName"
                style={inputStyle}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                name="lastName"
                style={inputStyle}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Address</label>
              <input
                type="text"
                name="address"
                style={inputStyle}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Date Of Birth</label>
              <input
                type="date"
                name="dob"
                style={inputStyle}
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>ID No</label>
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
              <label style={labelStyle}>Enrolled Course</label>
              <input
                type="text"
                name="enrolledCourses"
                style={inputStyle}
                value={formData.enrolledCourses}
                onChange={handleChange}
                required
              />
            </div>

            <div style={buttonContainerStyle}>
              <button
                type="submit"
                style={registerButtonStyle}
                onMouseEnter={() => setHoverRegister(true)} // Set hover state
                onMouseLeave={() => setHoverRegister(false)} // Reset hover state
              >
                Register
              </button>
              <button
                type="button"
                style={notifyButtonStyle}
                onMouseEnter={() => setHoverNotify(true)} // Set hover state
                onMouseLeave={() => setHoverNotify(false)} // Reset hover state
              >
                Notify Student
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddStudent;
