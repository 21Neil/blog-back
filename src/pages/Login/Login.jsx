import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
  const [formdata, setFormdata] = useState(null);
  const { post } = useFetch();
  const { checkAuth } = useContext(AuthContext);

  const submitOnClick = async e => {
    e.preventDefault();
    await post('auth/login', formdata);
    await checkAuth();
  };

  return (
    <>
      <form>
        <input
          type='text'
          name='username'
          onChange={e =>
            setFormdata(prev => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type='text'
          name='password'
          onChange={e =>
            setFormdata(prev => ({ ...prev, password: e.target.value }))
          }
        />
        <button onClick={submitOnClick}>submit</button>
      </form>
    </>
  );
};
