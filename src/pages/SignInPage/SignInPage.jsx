import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { login } from '../../http/userAPI';
import { getFavorites } from '../../http/favoriteAPI';
import { UserContext } from '../../context/UserContext';
import RegisterButton from '../../comnonents/UI/RegisterButton/RegisterButton';
import RegisterInput from '../../comnonents/UI/RegisterInput/RegisterInput';
import style from './SignInPage.module.scss';

function SignInPage() {
  const { setAuth, setUser, setFavoritesByUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password);
      setUser(user);
      setAuth(true);
      const favorites = await getFavorites(user.id);
      setFavoritesByUser(favorites);
      navigate(fromPage, { replace: true });
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <div className={style.signIn}>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <div className={style.signIn__wrapper}>
        <h1 className={style.signIn__title}>Вход</h1>
        <form className={style.signIn__form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.signIn__input}>
            <RegisterInput
              type="text"
              name="email"
              title="email"
              style={{
                borderColor: errors.email ? 'red' : '',
              }}
              {...register('email', { required: true })}
            />
            {errors.email?.type === 'required' && (
              <span className={style.signIn__textError}>Введите email</span>
            )}
          </div>
          <div className={style.signIn__input}>
            <RegisterInput
              type="password"
              name="password"
              title="Пароль"
              style={{
                borderColor: errors.password ? 'red' : '',
              }}
              {...register('password', { required: true })}
            />
            {errors.password?.type === 'required' && (
              <span className={style.signIn__textError}>Введите пароль</span>
            )}
          </div>
          {error.length > 0 && <div style={{ color: 'red' }}>{error}</div>}
          <div className={style.signIn__boxButton}>
            <RegisterButton>Войти</RegisterButton>
          </div>
        </form>
        <div className={style.signIn__textSignUp}>
          Нет аккаунта?{' '}
          <Link
            to="/signup"
            state={{ from: location.state?.from }}
            className={style.signIn__LinkSignUp}
          >
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
