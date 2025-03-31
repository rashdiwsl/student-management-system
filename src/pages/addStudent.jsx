import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

function AddStudent({
  formData: propFormData,
  onFormChange,
  onSubmit: propOnSubmit,
  isUpdateMode = false,
  onDelete,
  deleteConfirmation = false,
  onCancelDelete,
  isSubmitting: propIsSubmitting,
}) {
  const [localFormData, setLocalFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    degreeProgram: "",
    enrolledCourse: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formData = propFormData || localFormData;
  const setFormData = onFormChange || setLocalFormData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const localHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8085/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add student");
        } else {
          const text = await response.text();
          throw new Error(text || "Failed to add student");
        }
      }

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        setSuccessMessage(result.message || "Student added successfully!");
      } else {
        const text = await response.text();
        setSuccessMessage(text || "Student added successfully!");
      }

      setLocalFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        dob: "",
        degreeProgram: "",
        enrolledCourse: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setErrorMessage(
        error.message || "Failed to add student. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = propOnSubmit || localHandleSubmit;

  const handleNotify = () => {
    alert("Button Testing");
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "calc(100vh - 120px)",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "900px",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "10px",
  };

  const formContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "8px",
    color: "#333",
    fontSize: "14px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
    transition: "border 0.3s",
    width: "100%",
  };

  const fullWidthGroupStyle = {
    ...formGroupStyle,
    gridColumn: "1 / -1",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    gap: "15px",
    gridColumn: "1 / -1",
  };

  const baseButtonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const registerButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  };

  const notifyButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#2196F3",
    color: "white",
    "&:hover": {
      backgroundColor: "#0b7dda",
    },
  };

  const deleteButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: deleteConfirmation ? "#ff3333" : "#f44336",
    color: "white",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  };

  const messageStyle = {
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "20px",
    textAlign: "center",
    gridColumn: "1 / -1",
  };

  const successStyle = {
    ...messageStyle,
    backgroundColor: "#dff0d8",
    color: "#3c763d",
  };

  const errorStyle = {
    ...messageStyle,
    backgroundColor: "#f2dede",
    color: "#a94442",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <Topbar />
        <div style={mainContentStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {isUpdateMode ? "Update Student" : "Add New Student"}
            </h1>

            {successMessage && <div style={successStyle}>{successMessage}</div>}
            {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div style={formContainerStyle}>
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

                <div style={fullWidthGroupStyle}>
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
                  <label style={labelStyle}>Date of Birth</label>
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
                  <label style={labelStyle}>Degree Program</label>
                  <select
                    name="degreeProgram"
                    style={inputStyle}
                    value={formData.degreeProgram}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="AI and Data Science">
                      AI and Data Science
                    </option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Enrolled Course</label>
                  <select
                    name="enrolledCourse"
                    style={inputStyle}
                    value={formData.enrolledCourse}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="Software Engineering">
                      Software Engineering
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="AI and Data Science">
                      AI and Data Science
                    </option>
                    <option value="Machine Learning">Machine Learning</option>
                  </select>
                </div>

                <div style={buttonContainerStyle}>
                  {isUpdateMode && (
                    <button
                      type="button"
                      style={deleteButtonStyle}
                      onClick={onDelete}
                      disabled={propIsSubmitting || isSubmitting}
                    >
                      {deleteConfirmation ? "Confirm Delete" : "Delete Student"}
                    </button>
                  )}
                  {isUpdateMode && deleteConfirmation && (
                    <button
                      type="button"
                      style={{
                        ...baseButtonStyle,
                        backgroundColor: "#757575",
                        color: "white",
                      }}
                      onClick={onCancelDelete}
                      disabled={propIsSubmitting || isSubmitting}
                    >
                      Cancel
                    </button>
                  )}
                  <div style={{ flex: 1 }}></div>
                  <button
                    type="submit"
                    style={registerButtonStyle}
                    disabled={propIsSubmitting || isSubmitting}
                  >
                    {propIsSubmitting || isSubmitting
                      ? isUpdateMode
                        ? "Updating..."
                        : "Registering..."
                      : isUpdateMode
                      ? "Update Student"
                      : "Register Student"}
                  </button>
                  {!isUpdateMode && (
                    <button
                      type="button"
                      style={notifyButtonStyle}
                      onClick={handleNotify}
                    >
                      Notify Student
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddStudent;