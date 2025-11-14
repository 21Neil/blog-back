import styles from './AddPost.module.css';
import z from 'zod';
import { useNavigate } from 'react-router';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Stack } from '@mantine/core';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import ContentEditor from '../../components/ContentEditor/ContentEditor';
import PostTitle from '../../components/PostTitle/PostTitle';
import useFetch from '../../hooks/useFetch';
import createPostFormData from '../../utils/createPostFormdata';
import { useDisclosure } from '@mantine/hooks';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import NoticeModal from '../../components/NoticeModal/NoticeModal';
import { useMemo, useState } from 'react';

const ActionType = {
  cancel: 'cancel',
  publish: 'publish',
};

const schema = z.object({
  title: z.string().min(1, { message: '請輸入標題' }).trim(),
  image: z.file('請選擇封面圖片'),
});

const AddPost = () => {
  const [noticeTitle, setNoticeTitle] = useState('伺服器錯誤');
  const [actionType, setActionType] = useState(ActionType.publish);
  const { post } = useFetch(true);
  const navigate = useNavigate();

  const [
    confirmModalOpened,
    { open: confirmModalOpen, close: confirmModalClose },
  ] = useDisclosure(false);

  const [
    noticeModalOpened,
    { open: noticeModalOpen, close: noticeModalClose },
  ] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      image: null,
      content: '',
    },
    controlled: {
      content: value => form.setFieldValue('content', value),
    },
    validate: zod4Resolver(schema),
  });

  const confirmModalTitle = useMemo(() => {
    if (actionType === ActionType.cancel) return '確認取消？';
    if (actionType === ActionType.publish) return '確認發佈？';
  }, [actionType]);

  const handleCancel = () => {
    setActionType(ActionType.cancel);
    confirmModalOpen();
  };

  const handleSaveDraft = async () => {
    if (form.validate().hasErrors) return;

    const values = form.getValues();
    const formdata = createPostFormData(values, false);

    try {
      await post('admin/posts', formdata);
      navigate('/dashboard');
    } catch {
      setNoticeTitle('儲存失敗');
      noticeModalOpen();
    }
  };

  const handleSubmit = () => {
    setActionType(ActionType.publish);
    confirmModalOpen();
  };

  const handleModalConfirm = async () => {
    confirmModalClose();

    if (actionType === ActionType.cancel) {
      navigate(-1);
      return;
    }

    if (actionType === ActionType.publish) {
      const values = form.getValues();
      const formdata = createPostFormData(values, true);

      try {
        await post('admin/posts', formdata);
        navigate('/dashboard');
      } catch {
        setNoticeTitle('發布失敗');
        noticeModalOpen();
      }

      return;
    }
  };

  return (
    <main className={`main-container ` + styles.addPost}>
      <Stack
        component='form'
        h='100%'
        gap={0}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <PostTitle form={form} />

        <ImageUploader form={form} />

        <ContentEditor form={form} />

        <Group justify='flex-end' gap={10} mt={20}>
          <Button variant='light' onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSaveDraft} variant='light'>
            儲存草稿
          </Button>
          <Button type='submit'>發布</Button>
        </Group>
      </Stack>
      <ConfirmModal
        close={confirmModalClose}
        opened={confirmModalOpened}
        handleModalConfirm={handleModalConfirm}
        title={confirmModalTitle}
      />
      <NoticeModal
        close={noticeModalClose}
        opened={noticeModalOpened}
        title={noticeTitle}
      />
    </main>
  );
};

export default AddPost;
