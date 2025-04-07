import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuideDashboard from '../components/guide/GuideDashboard';
import RequestList from '../components/guide/RequestList';
import ReportView from '../components/guide/ReportView';

const GuidePage = () => {
  return (
    <Routes>
      <Route index element={<GuideDashboard />} />
      <Route path="requests" element={<RequestList />} />
      <Route path="reports/:type/:id" element={<ReportView />} />
    </Routes>
  );
};

export default GuidePage;