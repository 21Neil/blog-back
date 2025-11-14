import styles from './AddPost.module.css';
import z from 'zod';
import { useNavigate } from 'react-router';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Button, Group, Stack } from '@mantine/core';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import ContentEditor from '../../components/ContentEditor/ContentEditor';
import PostTitle from '../../components/PostTitle/PostTitle';

const schema = z.object({
  title: z.string().min(1, { message: '請輸入標題' }).trim(),
  image: z.file('請選擇封面圖片'),
});

const AddPost = () => {
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSaveDraft = async () => {
    console.log(form.getValues())
  };

  const handleSubmit = async values => {
    console.log(values);
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
    </main>
  );
};

export default AddPost;
