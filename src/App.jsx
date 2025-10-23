import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from './context/AuthContext';
import Loading from './components/Loading/Loading';

function App() {
  const navigate = useNavigate();
  const { isLogin, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogin) navigate('/login');
    if (isLogin) navigate('/dashboard');
  }, [isLogin]);

  return (
    <>
      <Outlet />
      {loading ? <Loading loading={loading} /> : null}
    </>
  );
}

export default App;
