import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import CommentListItem from './Widgets/CommentListItem';
import { useDisclosure } from '@mantine/hooks';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import NoticeModal from '../../components/NoticeModal/NoticeModal';

const CommentsDashboard = () => {
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const { get, del } = useFetch();
  const deleteCommentID = useRef();
  const navigate = useNavigate();

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure(false);

  const [
    noticeModalOpened,
    { open: openNoticeModal, close: closeNoticeModal },
  ] = useDisclosure(false);

  const handleModalConfirm = async () => {
    closeConfirmModal();

    try {
      await del(`/admin/comments/${deleteCommentID.current}`);
      getComments();
    } catch {
      openNoticeModal();
    }
  };

  const handleDeleteComment = id => {
    openConfirmModal();
    deleteCommentID.current = id;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getComments = useCallback(async () => {
    const comments = await get(`/posts/${id}/comments`);

    if (comments) setComments(comments);
  }, [id, get]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <main className='main-container'>
      <Stack h='100%'>
        <Title>管理留言</Title>

        <Stack px='1rem' gap='1rem' mb={20}>
          {comments ? (
            comments.map(comment => (
              <CommentListItem
                key={comment.id}
                {...{ comment, handleDeleteComment }}
              />
            ))
          ) : (
            <Text c='gray.6'>尚無留言...</Text>
          )}
        </Stack>

        <Button variant='light' ml='auto' mt='auto' onClick={handleBack}>
          返回
        </Button>
      </Stack>

      <ConfirmModal
        opened={confirmModalOpened}
        close={closeConfirmModal}
        handleModalConfirm={handleModalConfirm}
        title={'確認刪除？'}
      />
      <NoticeModal
        opened={noticeModalOpened}
        close={closeNoticeModal}
        title={'刪除失敗'}
      />
    </main>
  );
};

export default CommentsDashboard;
