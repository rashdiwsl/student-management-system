import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Snackbar, Button, TextField, Box } from '@mui/material';
import Topbarnew from './Topbarnew';

function StuLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending login data to the backend
    const user = { email, password };

    fetch("http://localhost:8085/listStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.token) {
            console.log("Login successful:", data);
            localStorage.setItem("authToken", data.token); // Store JWT token
            setMessage("Login successful. Redirecting to Student Dashboard...");
            setOpenSnackbar(true);
            setTimeout(() => {
              navigate('/stuDash'); // Redirect to the student dashboard
            }, 1500);
          } else {
            setMessage("Invalid credentials. Please try again.");
            setOpenSnackbar(true);
          }
        } else {
          setMessage("Student not found. Please contact your department.");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setMessage("Login failed. Please check your email and password.");
        setOpenSnackbar(true);
      });
  };

  return (
    <div>
      <Topbarnew />
      <div className="login-box">
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Login
          </Button>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
        />
      </div>
      <Footer />
    </div>
  );
}

export default StuLogin;
