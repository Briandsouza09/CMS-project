import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './components/auth/Login';
import RegisterStudent from './components/auth/RegisterStudent';
import RegisterGuide from './components/auth/RegisterGuide';
import StudentDashboard from './components/student/StudentDashboard';
import GuideDashboard from './components/guide/GuideDashboard';
import InternshipForm from './components/student/InternshipForm';
import ProjectForm from './components/student/ProjectForm';
import RequestStatus from './components/student/RequestStatus';
import RequestList from './components/guide/RequestList';
import ReportView from './components/guide/ReportView';
import ReportForm from './components/student/ReportForm';

// Private Route Component
const PrivateRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register/student" element={<RegisterStudent />} />
          <Route path="register/guide" element={<RegisterGuide />} />

          {/* Student Routes */}
          <Route 
            path="student" 
            element={
              <PrivateRoute requiredRole="student">
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="student/internship" 
            element={
              <PrivateRoute requiredRole="student">
                <InternshipForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="student/project" 
            element={
              <PrivateRoute requiredRole="student">
                <ProjectForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="student/requests" 
            element={
              <PrivateRoute requiredRole="student">
                <RequestStatus />
              </PrivateRoute>
            } 
          />
          {/* Combined Report Form Route */}
          <Route 
            path="student/:type/:id/report" 
            element={
              <PrivateRoute requiredRole="student">
                <ReportForm />
              </PrivateRoute>
            } 
          />

          {/* Guide Routes */}
          <Route 
            path="guide" 
            element={
              <PrivateRoute requiredRole="guide">
                <GuideDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="guide/requests" 
            element={
              <PrivateRoute requiredRole="guide">
                <RequestList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="guide/reports/:type/:id" 
            element={
              <PrivateRoute requiredRole="guide">
                <ReportView />
              </PrivateRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
