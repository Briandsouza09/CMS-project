import axios from 'axios';

// Create axios instance with environment-based baseURL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Attach authorization token if available
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

// ===== License APIs =====
export const checkLicense = () => API.get('/license/check');
export const registerLicense = (data) => API.post('/license/register', data);
export const getLicenseData = () => API.get('/license/data');

// ===== Auth APIs =====
export const login = (formData) => API.post('/auth/login', formData);
export const registerStudent = (formData) => API.post('/auth/register/student', formData);
export const registerGuide = (formData) => API.post('/auth/register/guide', formData);

// ===== Student APIs =====
export const createInternship = (formData) => API.post('/student/internship', formData);
export const createProject = (formData) => API.post('/student/project', formData);
export const getStudentRequests = () => API.get('/student/requests');
export const createInternshipReport = (id, formData) => API.post(`/student/internship/${id}/report`, formData);
export const createProjectReport = (id, formData) => API.post(`/student/project/${id}/report`, formData);

// ===== Guide APIs =====
export const getGuideRequests = () => API.get('/guide/requests');
export const updateInternshipStatus = (id, status) => API.put(`/guide/internship/${id}/status`, { status });
export const updateProjectStatus = (id, status) => API.put(`/guide/project/${id}/status`, { status });
export const getInternshipReports = (id) => API.get(`/guide/internship/${id}/reports`);
export const getProjectReports = (id) => API.get(`/guide/project/${id}/reports`);

export default API;
