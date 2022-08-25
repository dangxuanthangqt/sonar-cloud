import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RequestStatus from '@/pages/request-status';
import Reports from '@/pages/reports';
import Cair from '@/pages/reports/containers/Cair/Cair';

export default function ReportsRoute() {
  return (
    <Routes>
      <Route path="request-status" element={<RequestStatus />} />
      <Route path="reports/*" element={<Reports />} />
      <Route path="reports/cair/*" element={<Cair />} />
      <Route path="*" element={<Navigate to="reports/glove-box" replace />} />
    </Routes>
  );
}
