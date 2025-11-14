import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { loading, get } = useFetch();

  const checkAuth = async () => {
    const res = await get('auth/check-login');
    if (res && res.isLogin) setIsLogin(res.isLogin);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await get('auth/check-login');

        if (res && res.isLogin) setIsLogin(res.isLogin);
      } catch (err) {
        console.error('Authentication check fail', err);
      } finally {
        setIsAuthReady(true);
      }
    };

    checkLogin();
  }, [get]);

  const authData = { isLogin, setIsLogin, loading, checkAuth, isAuthReady };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
