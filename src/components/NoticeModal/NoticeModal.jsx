import { Center, Modal, Title } from '@mantine/core';

const NoticeModal = ({ opened, close, title }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size='xs'
      withCloseButton={false}
      padding={0}
    >
      <Center h={150}>
        <Title order={2} size={24}>
          {title}
        </Title>
      </Center>
    </Modal>
  );
}

export default NoticeModal;
