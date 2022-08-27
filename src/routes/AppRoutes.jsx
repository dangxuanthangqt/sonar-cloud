import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DataRequestRoutes from './DataRequestRoutes';
import Dashboard from '@/pages/dashboard';
import SignIn from '@/pages/sign-in';
import SignUp from '@/pages/sign-up';
import Reports from '@/pages/reports';
import Summary from '@/pages/summary';
import TopBar from '@/components/main-layout/TopBar';
import ReportsRoute from './ReportsRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="dashboard"
          element={
            <>
              <TopBar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="reports/*"
          element={
            <>
              <TopBar />
              <ReportsRoute />
            </>
          }
        />
        {/* <Route path="reports" element={<Reports />} /> */}
        <Route
          path="summary"
          element={
            <TopBar>
              <Summary />
            </TopBar>
          }
        />
        <Route
          path="data-request/*"
          element={
            <>
              <TopBar />
              <DataRequestRoutes />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
