import { Box, FileInput, Image, Text } from '@mantine/core';
import styles from './ImageUploader.module.css';

const ImageUploader = ({ form }) => (
  <Box h={{ base: 250, xs: 400}} mb={16}>
    <label className={styles.imageLabel}>
      {form.getValues().imageUrl ? (
        <Image src={form.getValues().imageUrl} />
      ) : (
        <p>Check to upload photo...</p>
      )}
      <FileInput
        classNames={{ root: styles.imageInput }}
        accept='image/*'
        key={form.key('image')}
        {...form.getInputProps('image')}
        error={form.errors.image}
        onChange={e => {
          form.setFieldValue('image', e);
          form.setFieldValue('imageUrl', URL.createObjectURL(e));
        }}
      />
    </label>
    <Text size='sm' inline c='red.6' h={14}>
      {form.errors.imageUrl}
    </Text>
  </Box>
);

export default ImageUploader;
