

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// Utility Functions
const formatDateTime = (timestamp) => {
  if (!timestamp) return "N/A";
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const Maintain = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseId: "",
    courseName: "",
    updatedByEmail: "",
  });
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const [deleteStatus, setDeleteStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  // Fetch courses from the backend 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8085/getCourse");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.courseId?.toLowerCase().includes(searchLower) ||
      course.courseName?.toLowerCase().includes(searchLower) ||
      course.updatedByEmail?.toLowerCase().includes(searchLower)
    );
  });

  // Handle row click to edit
  const handleRowClick = (course) => {
    setEditingCourse(course);
    setFormData({
      courseId: course.courseId || "",
      courseName: course.courseName || "",
      updatedByEmail: course.updatedByEmail || "",
    });
  };

  // Handle delete confirmation
  const handleDeleteClick = (course, e) => {
    e.stopPropagation(); // Prevent triggering the row click
    setDeletingCourse(course);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch(
        `http://localhost:8085/updateCourse/${editingCourse.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the courses list with the edited course
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id
          ? { ...course, ...formData, updatedAt: new Date().toISOString() }
          : course
      );

      setCourses(updatedCourses);
      setSaveStatus({ loading: false, error: null, success: true });

      // Close modal after 1.5 seconds
      setTimeout(() => {
        setEditingCourse(null);
        setSaveStatus({ loading: false, error: null, success: false });
      }, 1500);
    } catch (error) {
      console.error("Error updating course:", error);
      setSaveStatus({ loading: false, error: error.message, success: false });
    }
  };

  // Handle course deletion
  const handleDeleteConfirm = async () => {
    setDeleteStatus({ loading: true, error: null, success: false });

    try {
      const response = await fetch(
        `http://localhost:8085/removeCourse/${deletingCourse.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the course from the list
      const updatedCourses = courses.filter(
        (course) => course.id !== deletingCourse.id
      );
      setCourses(updatedCourses);
      setDeleteStatus({ loading: false, error: null, success: true });

      // Close modal after 1.5 seconds
      setTimeout(() => {
        setDeletingCourse(null);
        setDeleteStatus({ loading: false, error: null, success: false });
      }, 1500);
    } catch (error) {
      console.error("Error deleting course:", error);
      setDeleteStatus({ loading: false, error: error.message, success: false });
    }
  };

  // Close modals
  const handleCloseModal = () => {
    setEditingCourse(null);
    setSaveStatus({ loading: false, error: null, success: false });
  };

  const handleCloseDeleteModal = () => {
    setDeletingCourse(null);
    setDeleteStatus({ loading: false, error: null, success: false });
  };

  // Styles
  const containerStyle = {
    padding: "20px",
    minHeight: "100vh",
    textAlign: "center",
    paddingTop: "90px",
    // backgroundColor: "#f5f5f5",
  };

  const inputStyle = {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    marginRight: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const tableContainerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxHeight: "calc(100vh - 250px)",
    overflowY: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
  };

  const thStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    position: "sticky",
    top: 0,
  };

  const tdStyle = {
    padding: "12px 15px",
    borderBottom: "1px solid #e0e0e0",
    textAlign: "left",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const trHoverStyle = {
    backgroundColor: "#f8f9fa",
  };

  const deleteButtonStyle = {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
    marginLeft: "10px",
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    fontSize: "18px",
    color: "#555",
  };

  const errorStyle = {
    color: "#e74c3c",
    backgroundColor: "#fde8e8",
    padding: "15px",
    borderRadius: "4px",
    margin: "20px auto",
    maxWidth: "600px",
  };

  // Modal styles
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    width: "500px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const modalTitleStyle = {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#2c3e50",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#555",
  };

  const formInputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  };

  const saveButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  };

  const cancelButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    color: "#555",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  };

  const deleteConfirmButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  };

  const statusMessageStyle = {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
  };

  const successMessageStyle = {
    ...statusMessageStyle,
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  };

  const errorMessageStyle = {
    ...statusMessageStyle,
    backgroundColor: "#ffebee",
    color: "#c62828",
  };

  const deleteMessageStyle = {
    margin: "20px 0",
    fontSize: "16px",
    color: "#555",
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div style={containerStyle}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "25px",
              color: "#2c3e50",
            }}
          >
            Course Management
          </h1>

          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search by Course ID, Name, or Email..."
              style={inputStyle}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Loading, Error Handling */}
          {loading && <div style={loadingStyle}>Loading course data...</div>}
          {error && (
            <div style={errorStyle}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Table Section */}
          {!loading && !error && (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Course ID</th>
                    <th style={thStyle}>Course Name</th>
                    <th style={thStyle}>Last Updated</th>
                    <th style={thStyle}>Updated By</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <tr
                        key={`${course.id}-${course.courseId}`}
                        onClick={() => handleRowClick(course)}
                        style={trHoverStyle}
                      >
                        <td style={tdStyle}>{course.courseId || "N/A"}</td>
                        <td style={tdStyle}>{course.courseName || "N/A"}</td>
                        <td style={tdStyle}>
                          {formatDateTime(course.updatedAt)}
                        </td>
                        <td style={tdStyle}>
                          {course.updatedByEmail || "N/A"}
                        </td>
                        <td style={tdStyle}>
                          <button
                            onClick={(e) => handleDeleteClick(course, e)}
                            style={deleteButtonStyle}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          ...tdStyle,
                          textAlign: "center",
                          cursor: "default",
                        }}
                      >
                        {searchTerm
                          ? "No matching courses found"
                          : "No courses available"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Footer />

        {/* Edit Course Modal */}
        {editingCourse && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2 style={modalTitleStyle}>Edit Course</h2>

              <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Course ID</label>
                  <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    style={formInputStyle}
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    style={formInputStyle}
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Updated By Email</label>
                  <input
                    type="email"
                    name="updatedByEmail"
                    value={formData.updatedByEmail}
                    onChange={handleInputChange}
                    style={formInputStyle}
                    required
                  />
                </div>

                {/* Status messages */}
                {saveStatus.error && (
                  <div style={errorMessageStyle}>Error: {saveStatus.error}</div>
                )}

                {saveStatus.success && (
                  <div style={successMessageStyle}>
                    Course updated successfully!
                  </div>
                )}

                <div style={buttonGroupStyle}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={cancelButtonStyle}
                    disabled={saveStatus.loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={saveButtonStyle}
                    disabled={saveStatus.loading}
                  >
                    {saveStatus.loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingCourse && (
          <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
              <h2 style={modalTitleStyle}>Delete Course</h2>

              <div style={deleteMessageStyle}>
                Are you sure you want to delete the course{" "}
                <strong>{deletingCourse.courseName}</strong> (ID:{" "}
                {deletingCourse.courseId})? This action cannot be undone.
              </div>

              {/* Status messages */}
              {deleteStatus.error && (
                <div style={errorMessageStyle}>Error: {deleteStatus.error}</div>
              )}

              {deleteStatus.success && (
                <div style={successMessageStyle}>
                  Course deleted successfully!
                </div>
              )}

              <div style={buttonGroupStyle}>
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  style={cancelButtonStyle}
                  disabled={deleteStatus.loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  style={deleteConfirmButtonStyle}
                  disabled={deleteStatus.loading}
                >
                  {deleteStatus.loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintain;
