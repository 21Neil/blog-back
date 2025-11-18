import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import useFetch from '../../hooks/useFetch';
import style from './Dashboard.module.css';
import { LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { Button, Group, Stack, Title } from '@mantine/core';
import PostListItem from './Widgets/PostListItem';

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { setIsLogin } = useContext(AuthContext);
  const { get, post, put } = useFetch();

  const getAllPosts = useCallback(async () => {
    const res = await get('/admin/posts');
    setPosts(res);
  }, [get]);

  const logoutOnClick = async () => {
    await post('/auth/logout');
    setIsLogin(false);
  };

  const handlePublish = async (id, published) => {
    await put('/admin/posts/' + id, {
      published,
    });
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Stack component='main' className={style.dashboard}>
      <Group justify='flex-end'>
        <Button variant='light' onClick={logoutOnClick}>
          <LogOut size={14} />
          <span>logout</span>
        </Button>
      </Group>

      <Title>管理貼文</Title>

      <Group justify='flex-end'>
        <Link to='/add-post'>
          <Button>
            <Plus size={14} />
            <span>新增貼文</span>
          </Button>
        </Link>
      </Group>

      {posts.map(item => (
        <PostListItem item={item} handlePublish={handlePublish} />
      ))}
    </Stack>
  );
};
