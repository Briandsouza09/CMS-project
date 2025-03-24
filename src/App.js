import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import StaffSignUp from './pages/StaffSignUp'; // Import StaffSignUp
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Internships from './components/Internships';
import Projects from './components/Projects';
import Profile from './components/Profile';
import InternshipApplications from './components/InternshipApplications';
import ProjectRequests from './components/ProjectRequests';
import StaffDashboard from './components/StaffDashboard'; // Import StaffDashboard

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState(null); // Track user role (student or staff)
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsAuthenticated(true);
      setUserRole(user.role); // Set user role (student or staff)
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.href = '/login';
  };

  return (
    <div className="flex">
      {/* Render Sidebar only for authenticated users */}
      {isAuthenticated && (
        <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
          userRole={userRole} // Pass user role to Sidebar
        />
      )}
      <div className={`flex-1 transition-all duration-300 ${isAuthenticated && isOpen ? 'ml-64' : 'ml-0'} p-4`}>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                // Redirect based on user role
                userRole === 'staff' ? (
                  <Navigate to={location.state?.from || '/staff/dashboard'} />
                ) : (
                  <Navigate to={location.state?.from || '/dashboard'} />
                )
              ) : (
                <SignIn setAuth={setIsAuthenticated} setUserRole={setUserRole} />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/staff/signup" element={<StaffSignUp />} />

          {/* Student Routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated && userRole !== 'staff' ? <Dashboard /> : <Navigate to="/login" state={{ from: '/dashboard' }} />}
          />
          <Route
            path="/internships"
            element={isAuthenticated && userRole !== 'staff' ? <Internships /> : <Navigate to="/login" state={{ from: '/internships' }} />}
          />
          <Route
            path="/projects"
            element={isAuthenticated && userRole !== 'staff' ? <Projects /> : <Navigate to="/login" state={{ from: '/projects' }} />}
          />
          <Route
            path="/profile"
            element={isAuthenticated && userRole !== 'staff' ? <Profile /> : <Navigate to="/login" state={{ from: '/profile' }} />}
          />
          <Route
            path="/internship-applications"
            element={isAuthenticated && userRole !== 'staff' ? <InternshipApplications /> : <Navigate to="/login" state={{ from: '/internship-applications' }} />}
          />
          <Route
            path="/project-requests"
            element={isAuthenticated && userRole !== 'staff' ? <ProjectRequests /> : <Navigate to="/login" state={{ from: '/project-requests' }} />}
          />

          {/* Staff Routes */}
          <Route
            path="/staff/dashboard"
            element={isAuthenticated && userRole === 'staff' ? <StaffDashboard /> : <Navigate to="/login" state={{ from: '/staff/dashboard' }} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}