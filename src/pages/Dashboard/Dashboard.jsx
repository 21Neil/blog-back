import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import style from './Dashboard.module.css'
import { LogOut, Plus } from 'lucide-react';

export const Dashboard = () => {
  const { setIsLogin } = useContext(AuthContext);
  const { get, post } = useFetch();

  const logoutOnClick = async () => {
    await post('auth/logout');
    setIsLogin(false);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await get('admin/posts')
      console.log(res)
    }

    getAllPosts()
  }, [])

  return (
    <main className={style.dashboard}>
      <div className='btn-container'>
        <button className='btn second' onClick={logoutOnClick}>
          <LogOut size={14} />
          <span>logout</span>
        </button>
      </div>
      <h1>管理貼文</h1>
      <div className="btn-container">
        <button className="btn">
          <Plus size={14} />
          <span>新增貼文</span>
        </button>
      </div>
    </main>
  );
};
