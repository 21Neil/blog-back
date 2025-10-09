import { Field, Input } from '@chakra-ui/react';

export const InputField = ({ label, error, required = false, ...rest }) => {
  console.log(error, !!error);
  const isInvalid = !!error;

  return (
    <Field.Root invalid>
      <Field.Label fontSize='1rem'>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        size='xs'
        w='60'
        borderColor='gray.400'
        rounded='5px'
        {...rest}
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};
