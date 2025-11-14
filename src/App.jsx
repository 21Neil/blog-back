import { useContext, useEffect } from 'react';
import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Loading from './components/Loading/Loading';
import { AuthContext } from './context/Auth/AuthContext';
import LoadingContext from './context/Loading/LoadingContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, isAuthReady } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!isAuthReady) return;

    const currentPath = location.pathname;

    if (!isLogin && currentPath !== '/login') {
      navigate('/login');
      return;
    }
    if (isLogin && currentPath === '/login') {
      navigate('/dashboard');
      return;
    }
  }, [isAuthReady, location.pathname, isLogin, navigate]);

  return (
    <>
      <Outlet />
      {isLoading ? <Loading loading={isLoading} /> : null}
    </>
  );
}

export default App;
