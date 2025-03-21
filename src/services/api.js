// frontend/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL for the backend API

// Sign Up
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Signup failed. Please try again.';
  }
};

// Sign In
export const signIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Invalid credentials. Please try again.';
  }
};

// Create Internship Request
export const createInternshipRequest = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/internships`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create internship request.';
  }
};

// Get Internship Requests
export const getInternshipRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/internships`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch internship requests.';
  }
};

// Create Project Request
export const createProjectRequest = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create project request.';
  }
};

// Get Project Requests
export const getProjectRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch project requests.';
  }
};

// Export all functions
export default {
  signUp,
  signIn,
  createInternshipRequest,
  getInternshipRequests,
  createProjectRequest,
  getProjectRequests,
};