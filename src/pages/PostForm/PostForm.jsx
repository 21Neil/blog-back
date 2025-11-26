import styles from './PostForm.module.css';
import z from 'zod';
import { useNavigate, useParams } from 'react-router';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, FileInput, Group, Stack } from '@mantine/core';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import ContentEditor from '../../components/ContentEditor/ContentEditor';
import PostTitle from '../../components/PostTitle/PostTitle';
import useFetch from '../../hooks/useFetch';
import createPostFormData from '../../utils/createPostFormdata';
import { useDisclosure } from '@mantine/hooks';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import NoticeModal from '../../components/NoticeModal/NoticeModal';
import { useEffect, useMemo, useState } from 'react';

const ActionType = {
  cancel: 'cancel',
  publish: 'publish',
};

const schema = z.object({
  title: z.string().min(1, { message: '請輸入標題' }).trim(),
  imageUrl: z.string().min(1, { message: '請選擇封面圖片'}),
});

const PostForm = () => {
  const { id } = useParams();
  const [noticeTitle, setNoticeTitle] = useState('伺服器錯誤');
  const [actionType, setActionType] = useState(ActionType.publish);
  const [isLoaded, setIsLoaded] = useState(!id);
  const { post, put } = useFetch(true);
  const navigate = useNavigate();

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure(false);

  const [
    noticeModalOpened,
    { open: openNoticeModal, close: closeNoticeModal },
  ] = useDisclosure(false);

  const { setInitialValues, setValues, ...form } = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      image: null,
      imageUrl: '',
      TEXTContent: '',
      HTMLContent: '',
      JSONContent: {},
    },
    validate: zod4Resolver(schema),
  });

  const confirmModalTitle = useMemo(() => {
    if (actionType === ActionType.cancel) return '確認取消？';
    if (actionType === ActionType.publish) return '確認發佈？';
  }, [actionType]);

  const handleCancel = () => {
    console.log(form.getValues());
    setActionType(ActionType.cancel);
    openConfirmModal();
  };

  const handleSaveDraft = async () => {
    console.log(form.getValues())
    if (form.validate().hasErrors) return;

    const values = form.getValues();
    const formdata = createPostFormData(values, false);

    if (!id) {
      try {
        await post('/admin/posts', formdata);
        navigate('/dashboard');
      } catch {
        setNoticeTitle('儲存失敗');
        openNoticeModal();
      }
      return;
    }

    console.log(id)

    if (id) {
      try {
        await put('/admin/posts/' + id, formdata);
        navigate('/dashboard');
      } catch {
        setNoticeTitle('儲存失敗');
        openNoticeModal();
      }
      return;
    }
  };

  const handleSubmit = () => {
    setActionType(ActionType.publish);
    openConfirmModal();
  };

  const handleModalConfirm = async () => {
    closeConfirmModal();

    if (actionType === ActionType.cancel) {
      navigate(-1);
      return;
    }

    if (actionType === ActionType.publish) {
      const values = form.getValues();
      const formdata = createPostFormData(values, true);

      if (!id) {
        try {
          await post('/admin/posts', formdata);
          navigate('/dashboard');
        } catch {
          setNoticeTitle('發布失敗');
          openNoticeModal();
        }
        return;
      }

      if (id) {
        try {
          await put('/admin/posts/' + id, formdata);
          navigate('/dashboard');
        } catch {
          setNoticeTitle('發布失敗');
          openNoticeModal();
        }
        return;
      }

      return;
    }
  };

  useEffect(() => {
    const getPostData = async id => {
      try {
        const data = await post('/admin/posts/' + id);
        const formData = {
          title: data.title,
          imageUrl: data.imageUrl,
          TEXTContent: data.TEXTContent,
          HTMLContent: data.HTMLContent,
          JSONContent: JSON.parse(data.JSONContent),
        };
        setInitialValues(formData);
        setValues(formData);
        setIsLoaded(true);
      } catch {
        setNoticeTitle('獲取文章資料失敗');
        openNoticeModal();
      }
    };

    if (id) {
      getPostData(id);
    }
  }, [id, post, openNoticeModal, setInitialValues, setValues]);

  return (
    <main className={`main-container ` + styles.addPost}>
      {console.log(form.getValues())}
      <Stack
        component='form'
        h='100%'
        gap={0}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <PostTitle form={form} />

        <ImageUploader form={form} />

        {isLoaded && <ContentEditor form={form} />}

        {/* <div dangerouslySetInnerHTML={{ __html: form.getValues().HTMLContent}}></div> */}

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
        close={closeConfirmModal}
        opened={confirmModalOpened}
        handleModalConfirm={handleModalConfirm}
        title={confirmModalTitle}
      />
      <NoticeModal
        close={closeNoticeModal}
        opened={noticeModalOpened}
        title={noticeTitle}
      />
    </main>
  );
};

export default PostForm;
