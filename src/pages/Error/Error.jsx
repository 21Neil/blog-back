import style from './Error.module.css';

export const Error = () => {
  return (
    <main className={style.error}>
      <h1 className={style.error__title}>404 Not found</h1>
      <div className='btn-container'>
        <a href='/dashboard'>
          <button className='btn'>Back dashboard</button>
        </a>
      </div>
    </main>
  );
};
