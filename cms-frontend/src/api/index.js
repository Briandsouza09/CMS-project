import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const registerStudent = (formData) => API.post('/auth/register/student', formData);
export const registerGuide = (formData) => API.post('/auth/register/guide', formData);

// Student
export const createInternship = (formData) => API.post('/student/internship', formData);
export const createProject = (formData) => API.post('/student/project', formData);
export const getStudentRequests = () => API.get('/student/requests');
export const createInternshipReport = (id, formData) => API.post(`/student/internship/${id}/report`, formData);
export const createProjectReport = (id, formData) => API.post(`/student/project/${id}/report`, formData);

// Guide
export const getGuideRequests = () => API.get('/guide/requests');
export const updateInternshipStatus = (id, status) => API.put(`/guide/internship/${id}/status`, { status });
export const updateProjectStatus = (id, status) => API.put(`/guide/project/${id}/status`, { status });
export const getInternshipReports = (id) => API.get(`/guide/internship/${id}/reports`);
export const getProjectReports = (id) => API.get(`/guide/project/${id}/reports`);