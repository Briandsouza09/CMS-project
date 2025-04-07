import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../components/student/StudentDashboard';
import InternshipForm from '../components/student/InternshipForm';
import ProjectForm from '../components/student/ProjectForm';
import RequestStatus from '../components/student/RequestStatus';
import ReportForm from '../components/student/ReportForm';

const StudentPage = () => {
  return (
    <Routes>
      <Route index element={<StudentDashboard />} />
      <Route path="internship" element={<InternshipForm />} />
      <Route path="project" element={<ProjectForm />} />
      <Route path="requests" element={<RequestStatus />} />
      <Route path="internship/:id/report" element={<ReportForm />} />
      <Route path="project/:id/report" element={<ReportForm />} />
    </Routes>
  );
};

export default StudentPage;
