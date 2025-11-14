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

const schema = z.object({
  username: z.string().min(1, { message: '請輸入使用者名稱' }).trim(),
  password: z.string().min(1, { message: '請輸入密碼' }).trim(),
});

export const Login = () => {
  const { loading, post } = useFetch();
  const { checkAuth } = useContext(AuthContext);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = async values => {
    try {
      await post('auth/login', values);
      await checkAuth();
    } catch (err) {
      form.setFieldError('loginFail', err.message)
    }
  };

  return (
    <>
      <Stack component='main' align='center' justify='center' className={style.login}>
        <Title className={style.loginTitle}>Neil.</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack w={240} gap={0}>
            <LoginInput
              key={form.key('username')}
              {...form.getInputProps('username')}
              label='Username'
            />
            <LoginInput
              key={form.key('password')}
              {...form.getInputProps('password')}
              label='Password'
              type='password'
            />
          <Text size='sm' inline c='red.6' h={14}>{form.errors.loginFail}</Text>
          </Stack>
          <Group justify='flex-end'>
            <Button type='submit'>Login</Button>
          </Group>
        </form>
      </Stack>
      {loading ? <Loading loading={loading} /> : null}
    </>
  );
};
