import { Link } from 'react-router';
import style from './Error.module.css';
import { Button, Group, Stack, Title } from '@mantine/core';

export const Error = () => {
  return (
    <Stack component='main' className={style.error}>
      <Title>404 Not found</Title>
      <Link to='/dashboard'>
        <Button>Back dashboard</Button>
      </Link>
    </Stack>
  );
};
