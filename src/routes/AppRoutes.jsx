import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DataRequestRoutes from './DataRequestRoutes';
import Dashboard from '@/pages/dashboard';
import Reports from '@/pages/reports';
import Summary from '@/pages/summary';
import TopBar from '@/components/main-layout/TopBar';
import ReportsRoute from './ReportsRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports/*" element={<ReportsRoute />} />
        {/* <Route path="reports" element={<Reports />} /> */}
        <Route path="summary" element={<Summary />} />
        <Route path="data-request/*" element={<DataRequestRoutes />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
