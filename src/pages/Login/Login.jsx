import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import style from './Login.module.css';
import Loading from '../../components/Loading/Loading';

export const Login = () => {
  const [formdata, setFormdata] = useState(null);
  const { loading, post } = useFetch();
  const { checkAuth } = useContext(AuthContext);

  const submitOnClick = async e => {
    e.preventDefault();
    await post('auth/login', formdata);
    await checkAuth();
  };

  return (
    <>
      <main className={style.login}>
        <h1 className={style.login__title}>Neil.</h1>
        <form className={style.login__form}>
          <div className={style.login__inputGroup}>
            <div className={style.login__field}>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                autoComplete='username'
                onChange={e =>
                  setFormdata(prev => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className={style.login__field}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={e =>
                  setFormdata(prev => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          </div>
          <div className='btn-container'>
            <button className='btn' onClick={submitOnClick}>
              Login
            </button>
          </div>
        </form>
      </main>
      {loading ? <Loading loading={loading} /> : null}
    </>
  );
};
