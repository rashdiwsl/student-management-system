// src/services/authService.js

import axios from 'axios';

// Base URL for your backend API (update with the correct URL)
const API_URL = 'http://localhost:8080/api/auth/';

// Function to handle login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      return response.data;
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Function to get the user's profile
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in the request header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

// Function to handle logout
export const logout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
};

