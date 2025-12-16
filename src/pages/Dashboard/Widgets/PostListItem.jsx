import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Ellipsis } from 'lucide-react';

const PostListItem = ({ item, handlePublish, handleEdit }) => {
  return (
    <Box>
      <Flex h={66} gap={16} pt={8} pb={8}>
        <Image src={item.imageUrl} w={50} h={50} bdrs={5} />
        <Stack gap={0} justify='space-between'>
          <Title order={3} size={16}>
            {item.title}
          </Title>
          <Text size='sm'>{item.TEXTContent}</Text>
        </Stack>

        <Flex align='center' ml='auto'>
          <Menu position='bottom-end'>
            <Menu.Target>
              <Button variant='transparent'>
                <Ellipsis />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => handlePublish(item.id, !item.published, item.JSONContent)}
              >
                {item.published ? '取消發佈' : '發布貼文'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => handleEdit(item.id)}>
                更新貼文
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item>管理留言</Menu.Item>
              <Menu.Divider />
              <Menu.Item color='red'>刪除貼文</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};

export default PostListItem;
