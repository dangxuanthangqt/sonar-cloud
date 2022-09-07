import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from '@/pages/sign-in';
import SignUp from '@/pages/sign-up';

function NonAuthRoutes() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default NonAuthRoutes;
