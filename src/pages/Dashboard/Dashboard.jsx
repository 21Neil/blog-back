import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import useFetch from '../../hooks/useFetch';
import style from './Dashboard.module.css';
import { LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button, Group, Stack, Title } from '@mantine/core';
import PostListItem from './Widgets/PostListItem';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import NoticeModal from '../../components/NoticeModal/NoticeModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

export const Dashboard = () => {
  const [noticeTitle, setNoticeTitle] = useState('伺服器錯誤');
  const [posts, setPosts] = useState([]);
  const { setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { get, post, put, del } = useFetch(undefined, navigate);
  const deletePostID = useRef();
  const { width } = useViewportSize();
  const containerWidth = width > 768 ? 768 : width - 156;
  const textLength = (containerWidth / 14).toFixed();
  const titleLength = (containerWidth / 22).toFixed() - 1;

  const [
    noticeModalOpened,
    { open: openNoticeModal, close: closeNoticeModal },
  ] = useDisclosure(false);

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
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

  const handlePublish = async (id, published, JSONContent) => {
    try {
      await put('/admin/posts/' + id, {
        JSONContent,
        published,
      });
      await getAllPosts();
    } catch {
      setNoticeTitle(published ? '發布失敗' : '取消' + '發布失敗');
      openNoticeModal();
    }
  };

  const handleEdit = id => {
    navigate('/edit-post/' + id);
  };

  const handleCommentsManagement = id => {
    navigate('/comments-dashboard/' + id);
  };

  const handleDelete = async id => {
    openConfirmModal();
    deletePostID.current = id;
  };

  const handleModalConfirm = async () => {
    closeConfirmModal();

    try {
      await del(`/admin/posts/${deletePostID.current}`);
      getAllPosts();
    } catch {
      setNoticeTitle('刪除失敗');
      openNoticeModal;
    }
  };

  const changePasswordOnClick = () => {
    navigate('/password');
  };

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <main className={style.dashboard}>
      <Group justify='flex-end'>
        <Button variant='light' onClick={changePasswordOnClick}>
          變更密碼
        </Button>
        <Button variant='light' onClick={logoutOnClick}>
          <LogOut size={14} />
          <span>logout</span>
        </Button>
      </Group>
      <Stack>
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
            {...{
              item,
              handlePublish,
              handleEdit,
              handleCommentsManagement,
              handleDelete,
              textLength,
              titleLength,
            }}
          />
        ))}
      </Stack>
      <NoticeModal
        title={noticeTitle}
        opened={noticeModalOpened}
        close={closeNoticeModal}
      />
      <ConfirmModal
        title={'確認刪除？'}
        opened={confirmModalOpened}
        close={closeConfirmModal}
        handleModalConfirm={handleModalConfirm}
      />
    </main>
  );
};
