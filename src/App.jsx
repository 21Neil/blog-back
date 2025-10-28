import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from './context/AuthContext';
import Loading from './components/Loading/Loading';
import { LoadingContext } from './context/LoadingContext';

function App() {
  const navigate = useNavigate();
  const { isLogin } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLogin) navigate('/login');
    if (isLogin) navigate('/dashboard');
  }, [isLogin]);

  return (
    <>
      <Outlet />
      {isLoading ? <Loading loading={isLoading} /> : null}
    </>
  );
}

export default App;
