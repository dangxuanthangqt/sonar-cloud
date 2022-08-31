import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DataRequestRoutes from './DataRequestRoutes';
import Dashboard from '@/pages/dashboard';
import SignIn from '@/pages/sign-in';
import SignUp from '@/pages/sign-up';
import Reports from '@/pages/reports';
import Summary from '@/pages/summary';
import TopBar from '@/components/main-layout/TopBar';
import { loginUserDetailAtom } from '@/recoil/atom/login-state';
import ReportsRoute from './ReportsRoute';

function AppRoutes() {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const loginDetail = useRecoilValue(loginUserDetailAtom);

  useEffect(() => {
    if (loginDetail) {
      setIsAuthUser(true);
    }
  }, [loginDetail]);

  return (
    <>
      {isAuthUser && (
        <Routes>
          <Route
            path="dashboard"
            element={
              <>
                <TopBar />
                <div className="content-wrapper">
                  <Dashboard />
                </div>
              </>
            }
          />
          <Route
            path="reports/*"
            element={
              <>
                <TopBar />
                <div className="content-wrapper">
                  <ReportsRoute />
                </div>
              </>
            }
          />
          {/* <Route path="reports" element={<Reports />} /> */}
          <Route
            path="summary"
            element={
              <>
                <TopBar />
                <div className="content-wrapper">
                  <Summary />
                </div>
              </>
            }
          />
          <Route
            path="data-request/*"
            element={
              <>
                <TopBar />
                <div className="content-wrapper">
                  <DataRequestRoutes />
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
      {!isAuthUser && (
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      )}
    </>
  );
}

export default AppRoutes;
