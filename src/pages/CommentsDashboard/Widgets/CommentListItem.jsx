import { Flex, Stack, Text, Button, Title } from '@mantine/core';
import { Trash2 } from 'lucide-react';

const CommentListItem = ({ comment, handleDeleteComment }) => {
  const date = new Date(comment.date);

  return (
    <Flex justify='space-between' align='center'>
      <Stack gap={0}>
        <Flex gap='1rem' align='baseline'>
          <Title order={3} fz={14} fw={700}>
            {comment.name}
          </Title>
          <Text fz={12} c='gray.6' component='span'>
            {date.getFullYear() + '/' + (+date.getMonth() + 1) + '/' + date.getDate()}
          </Text>
        </Flex>

        <Text fz={14}>{comment.content}</Text>
      </Stack>

      <Button
        variant='transparent'
        c='red'
        p={2}
        miw={30}
        onClick={() => handleDeleteComment(comment.id)}
      >
        <Trash2 />
      </Button>
    </Flex>
  );
};

export default CommentListItem;
