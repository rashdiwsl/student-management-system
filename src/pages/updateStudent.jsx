import { useState, useEffect } from "react";
import AddStudent from "./addStudent";
import { Dialog, DialogContent, Paper } from "@mui/material";

function UpdateStudent({ student, open, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    dob: "",
    degreeProgram: "",
    enrolledCourse: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
        address: student.address || "",
        dob: student.dob || "",
        degreeProgram: student.degreeProgram || "",
        enrolledCourse: student.enrolledCourse || "",
      });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8085/updateStudent/${student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update student: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      const updatedStudent = result.id
        ? result
        : { ...formData, id: student.id };

      onUpdate(updatedStudent);
      onClose();
    } catch (err) {
      console.error("Error updating student:", err);
      setError(err.message || "Failed to update student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8085/removeStudent/${student.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete student: ${response.statusText}`);
      }

      onUpdate(null);
      onClose();
    } catch (err) {
      console.error("Error deleting student:", err);
      setError(err.message || "Failed to delete student");
    } finally {
      setIsSubmitting(false);
      setDeleteConfirmation(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent style={{ padding: 0, backgroundColor: "transparent" }}>
        {error && (
          <div
            style={{
              color: "red",
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "#ffeeee",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
        <Paper elevation={0} style={{ backgroundColor: "transparent" }}>
          <AddStudent
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleSubmit}
            isUpdateMode={true}
            isSubmitting={isSubmitting}
            onDelete={handleDelete}
            deleteConfirmation={deleteConfirmation}
            onCancelDelete={() => setDeleteConfirmation(false)}
          />
        </Paper>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateStudent;