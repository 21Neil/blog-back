import { PasswordInput, TextInput } from '@mantine/core';
import styles from './Login.module.css';

const LoginInput = props => {
  return props.type === 'password' ? (
    <PasswordInput
      classNames={{
        root: styles.loginInputRoot,
        input: styles.loginInputInput,
        label: styles.loginInputLabel,
        innerInput: styles.loginInputInnerInput,
      }}
      {...props}
    />
  ) : (
    <TextInput
      classNames={{
        root: styles.loginInputRoot,
        input: styles.loginInputInput,
        label: styles.loginInputLabel,
      }}
      {...props}
    />
  );
};

export default LoginInput;
