import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    firstname: "",
    lastname: "",
  });

  // Fetch user data from the backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8085/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
        setProfilePic(data.profilePic || "/path/to/default/image.jpg");
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/editProfile/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
          }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleChange = (e) => {
    if (isEditing) {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div style={styles.container}>
      <Topbar />
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.main}>
          <div style={styles.profileCard}>
            <div>
              <label htmlFor="profile-pic-upload">
                <img src={profilePic} alt="Avatar" style={styles.avatar} />
              </label>
              {isEditing && (
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                />
              )}
            </div>
            <div style={styles.details}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  readOnly={true}
                  style={{
                    ...styles.input,
                    backgroundColor: "#f0f0f0",
                    cursor: "not-allowed",
                  }}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={userData.firstname}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={styles.input}
                />
              </div>
              {isEditing ? (
                <button style={styles.button} onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button style={styles.button} onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Styles remain the same as in your original code
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  layout: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    position: "relative",
    backgroundColor: "#f7f7f7",
    padding: "50px",
    borderRadius: "10px",
    width: "800px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "20px",
    cursor: "pointer",
  },
  details: {
    flex: 1,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  label: {
    width: "80px",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#a8a0a0",
  },
  button: {
    backgroundColor: "#1760d1",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Profile;
