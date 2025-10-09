import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import { Heading, VStack } from '@chakra-ui/react';
import { InputField } from '../../components/InputField/InputField';
import { useForm } from 'react-hook-form';

export const Login = () => {
  const [formdata, setFormdata] = useState(null);
  const { post } = useFetch();
  const { checkAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitOnClick = async e => {
    e.preventDefault();
    await post('auth/login', formdata);
    await checkAuth();
  };

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <VStack
      as='main'
      justify='center'
      minH='100vh'
      transform='translateY(-7.5vh)'
    >
      <Heading
        as='h1'
        fontFamily='caveat'
        fontSize='2.57rem'
        fontWeight='normal'
      >
        Neil.
      </Heading>
      <VStack as='form' align='end' gap='5' onSubmit={onSubmit}>
        <VStack gap='3'>
          <InputField
            label='Username'
            type='text'
            {...register('username', { required: 'Required' })}
            error={errors.username?.message}
            required
          />
          <InputField
            label='Password'
            type='password'
            {...register('password')}
            required
            error={errors.password?.message}
          />
        </VStack>
        <div className='btn-container'>
          <button type='submit' className='btn'>
            submit
          </button>
        </div>
      </VStack>
    </VStack>
  );
};
