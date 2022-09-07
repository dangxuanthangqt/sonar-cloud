import { Navigate, Route, Routes } from 'react-router-dom';
import DataRequestRoutes from './DataRequestRoutes';
import Dashboard from '@/pages/dashboard';
import Reports from '@/pages/reports';
import Summary from '@/pages/summary';
import ReportsRoute from './ReportsRoute';

function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <div className="content-wrapper">
            <Dashboard />
          </div>
        }
      />
      <Route
        path="reports/*"
        element={
          <div className="content-wrapper">
            <ReportsRoute />
          </div>
        }
      />
      {/* <Route path="reports" element={<Reports />} /> */}
      <Route
        path="summary"
        element={
          <div className="content-wrapper">
            <Summary />
          </div>
        }
      />
      <Route
        path="data-request/*"
        element={
          <div className="content-wrapper">
            <DataRequestRoutes />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AuthRoutes;
