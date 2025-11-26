import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import useFetch from '../../hooks/useFetch';
import style from './Dashboard.module.css';
import { LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button, Group, Stack, Title } from '@mantine/core';
import PostListItem from './Widgets/PostListItem';
import { useDisclosure } from '@mantine/hooks';
import NoticeModal from '../../components/NoticeModal/NoticeModal';

export const Dashboard = () => {
  const [noticeTitle, setNoticeTitle] = useState('伺服器錯誤');
  const [posts, setPosts] = useState([]);
  const { setIsLogin } = useContext(AuthContext);
  const { get, post, put } = useFetch();
  const navigate = useNavigate();

  const [
    noticeModalOpened,
    { open: openNoticeModal, close: closeNoticeModal },
  ] = useDisclosure(false);

  const getAllPosts = useCallback(async () => {
    try {
      const res = await get('/admin/posts');
      setPosts(res);
    } catch {
      setNoticeTitle('獲取文章失敗');
      openNoticeModal();
    }
  }, [get, openNoticeModal]);

  const logoutOnClick = async () => {
    try {
      await post('/auth/logout');
      setIsLogin(false);
    } catch {
      setNoticeTitle('登出失敗');
      openNoticeModal();
    }
  };

  const handlePublish = async (id, published) => {
    try {
      await put('/admin/posts/' + id, {
        published,
      });
      await getAllPosts();
    } catch {
      setNoticeTitle(published ? '' : '取消' + '發布失敗');
      openNoticeModal();
    }
  };

  const handleEdit = id => {
    navigate('/edit-post/' + id);
  };

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <>
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
          <PostListItem
            key={item.id}
            item={item}
            handlePublish={handlePublish}
            handleEdit={handleEdit}
          />
        ))}
      </Stack>
      <NoticeModal
        title={noticeTitle}
        opened={noticeModalOpened}
        close={closeNoticeModal}
      />
    </>
  );
};
