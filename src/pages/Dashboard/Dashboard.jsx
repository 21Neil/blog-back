import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import useFetch from '../../hooks/useFetch';
import style from './Dashboard.module.css';
import { LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button, Group, Stack, Title } from '@mantine/core';

export const Dashboard = () => {
  const { setIsLogin } = useContext(AuthContext);
  const { get, post } = useFetch();

  const logoutOnClick = async () => {
    await post('auth/logout');
    setIsLogin(false);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const res = await get('admin/posts');
      console.log(res);
    };

    getAllPosts();
  }, [get]);

  return (
    <Stack component='main' className={style.dashboard}>
      <Group justify='flex-end'>
        <Button onClick={logoutOnClick}>
          <LogOut size={14} />
          <span>logout</span>
        </Button>
      </Group>
      <Title>管理貼文</Title>
      <Group justify='flex-end'>
        <Link to='/add-post'>
          <Button variant='light'>
            <Plus size={14} />
            <span>新增貼文</span>
          </Button>
        </Link>
      </Group>
    </Stack>
  );
};
