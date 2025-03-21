import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Internships from "./components/Internships";
import Projects from "./components/Projects";
import axios from "axios";

function App() {
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      checkApprovalStatus();
    }
  }, []);

  const checkApprovalStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/approval-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.status === "approved") {
        setIsApproved(true);
        setIsRejected(false);
      } else if (response.data.status === "rejected") {
        setIsApproved(false);
        setIsRejected(true);
      }
    } catch (error) {
      console.error("Error checking approval status", error);
    }
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} p-4`}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<SignIn setAuth={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/internships" element={isAuthenticated ? <Internships /> : <Navigate to="/login" />} />
            <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
