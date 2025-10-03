import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from './context/AuthContext';
import { Loading } from './pages/Loading/Loading';

function App() {
  const navigate = useNavigate();
  const { isLogin, loading} = useContext(AuthContext);

  useEffect(() => {
    if (!isLogin) navigate('/login')
    if (isLogin) navigate('/dashboard');
  }, [isLogin])

  return (
    <>
      {loading ? <Loading /> : <Outlet />}
    </>
  );
}

export default App;
