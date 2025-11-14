import { Button, Group, Modal, Stack, Title } from '@mantine/core';

function ConfirmModal({ opened, close, title, handleModalConfirm }) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      size='xs'
      padding={0}
    >
      <Stack h={176} justify='center' align='center' gap={24}>
        <Title order={2} size={24}>
          {title}
        </Title>
        <Group>
          <Button variant='light' onClick={close}>取消</Button>
          <Button onClick={handleModalConfirm}>確認</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ConfirmModal;
