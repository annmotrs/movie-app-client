import style from './Error.module.scss';

function Error({ message }) {
  return (
    <div className={style.error}>
      <h1 className={style.error__text}>Error: {message}</h1>
    </div>
  );
}

export default Error;
