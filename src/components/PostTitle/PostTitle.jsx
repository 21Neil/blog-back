import { TextInput, Title } from "@mantine/core";
import styles from './PostTitle.module.css'

const PostTitle = ({ form }) => (
  <Title>
    <TextInput
      classNames={styles}
      placeholder='Title'
      key={form.key('title')}
      {...form.getInputProps('title')}
    />
  </Title>
);

export default PostTitle;
