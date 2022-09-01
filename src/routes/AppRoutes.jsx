import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import TopBar from '@/components/main-layout/TopBar';
import { loginUserDetailAtom } from '@/recoil/atom/login-state';
import AuthRoutes from './AuthRoutes';
import NonAuthRoutes from './NonAuthRoutes';

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
        <>
          <TopBar />
          <AuthRoutes />
        </>
      )}
      {!isAuthUser && <NonAuthRoutes />}
    </>
  );
}

export default AppRoutes;
