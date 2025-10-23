import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

export const Dashboard = () => {
  const { setIsLogin } = useContext(AuthContext);
  const { loading, post } = useFetch();

  const logoutOnClick = async () => {
    await post('auth/logout');
    setIsLogin(false);
  };

  return <button onClick={logoutOnClick}>logout</button>;
};
