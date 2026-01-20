import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import style from './Login.module.css';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../context/Auth/AuthContext';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import z from 'zod';
import LoginInput from './LoginInput';
import { useNavigate } from 'react-router';

const loginSchema = z.object({
  username: z.string().min(1, { message: '請輸入使用者名稱' }).trim(),
  password: z.string().min(1, { message: '請輸入密碼' }).trim(),
});

const passwordSchema = z
  .object({
    password: z.string().min(1, { message: '請輸入密碼' }).trim(),
    newPassword: z
      .string()
      .min(8, { message: '密碼最少8字元' })
      .max(15, { message: '密碼最多15字元' })
      .refine(password => /[A-Z]/.test(password), {
        message: '密碼最少需要一個大寫字母',
      })
      .refine(password => /[a-z]/.test(password), {
        message: '密碼最少需要一個小寫字母',
      })
      .refine(password => /[0-9]/.test(password), {
        message: '密碼最少需要一個數字',
      })
      .refine(password => /[!@#$%^&*]/.test(password), {
        message: '密碼需要包含以下一個!@#$%^&*字元',
      })
      .trim(),
    confirmPassword: z.string().min(1, { message: '請確認你的新密碼' }).trim(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '確認密碼不相符',
    path: ['confirmPassword'],
  })
  .refine(data => data.password !== data.newPassword, {
    message: '新密碼不能與舊密碼相同',
    path: ['confirmPassword'],
  });

export const Login = () => {
  const { loading, post, put } = useFetch();
  const { checkAuth, isLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: isLogin
      ? { password: '', newPassword: '', confirmPassword: '' }
      : { username: '', password: '' },
    validate: zod4Resolver(isLogin ? passwordSchema : loginSchema),
  });

  const handleSubmit = async values => {
    if (isLogin) {
      try {
        await put('/admin/password', {
          password: values.password,
          newPassword: values.newPassword,
        });
        await checkAuth();
        form.reset();
      } catch (err) {
        form.setFieldError('passwordFail', err.message);
      }
    }

    if (!isLogin) {
      try {
        await post('/auth/login', values);
        await checkAuth();
      } catch (err) {
        form.setFieldError('loginFail', err.message);
      }
    }
  };

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <>
      <Stack
        component='main'
        align='center'
        justify='center'
        className={style.login}
      >
        <Title className={style.loginTitle}>Neil.</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack w={240} gap={0}>
            {!isLogin && (
              <LoginInput
                key={form.key('username')}
                {...form.getInputProps('username')}
                label='Username'
              />
            )}
            <LoginInput
              key={form.key('password')}
              {...form.getInputProps('password')}
              label='Password'
              type='password'
            />
            {isLogin && (
              <LoginInput
                key={form.key('newPassword')}
                {...form.getInputProps('newPassword')}
                label='newPassword'
                type='password'
              />
            )}
            {isLogin && (
              <LoginInput
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
                label='confirmPassword'
                type='password'
              />
            )}
            <Text size='sm' inline c='red.6' h={14}>
              {isLogin ? form.errors.passwordFail : form.errors.loginFail}
            </Text>
          </Stack>
          <Group justify='flex-end'>
            {isLogin && <Button variant='light' onClick={handleCancel}>Cancel</Button>}
            <Button type='submit'>{isLogin ? 'Save' : 'Login'}</Button>
          </Group>
        </form>
      </Stack>
      {loading ? <Loading loading={loading} /> : null}
    </>
  );
};
