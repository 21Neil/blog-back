import { Box, FileInput, Image, Text } from '@mantine/core';
import styles from './ImageUploader.module.css'

const ImageUploader = ({ form }) => (
  <Box mih={285}>
    <label className={styles.imageLabel}>
      {form.getValues().image ? (
        <Image src={URL.createObjectURL(form.getValues().image)} alt='' />
      ) : (
        <p>Check to upload photo...</p>
      )}
      <FileInput
        className={styles.imageInput}
        accept='image/*'
        key={form.key('image')}
        {...form.getInputProps('image')}
        error={form.errors.image}
      />
    </label>
    <Text size='sm' inline c='red.6' h={14}>{form.errors.image}</Text>
  </Box>
);

export default ImageUploader;
