import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import { Helmet } from 'react-helmet';
import RegisterButton from '../../comnonents/UI/RegisterButton/RegisterButton';
import RegisterInput from '../../comnonents/UI/RegisterInput/RegisterInput';
import style from './SignUpPage.module.scss';
import { checkEmail, checkNickname, registration } from '../../http/userAPI.js';

function SignUpPage() {
  const { setAuth, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    delete data.repeatedPassword;
    const user = await registration(data);
    setUser(user);
    setAuth(true);
    navigate(fromPage, { replace: true });
  };

  return (
    <div className={style.signUp}>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <div className={style.signUp__wrapper}>
        <h1 className={style.signUp__title}>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.signUp__groupInput}>
            <div className={style.signUp__column}>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="text"
                  name="nickname"
                  title="Никнейм"
                  style={{
                    borderColor: errors.nickname ? 'red' : '',
                  }}
                  {...register('nickname', {
                    required: true,
                    minLength: 2,
                    validate: {
                      checkNicknameValidate: async (v) => {
                        const data = await checkNickname(v);
                        return !data;
                      },
                    },
                  })}
                />
                {errors.nickname?.type === 'required' && (
                  <span className={style.signUp__textError}>
                    Введите никнейм
                  </span>
                )}
                {errors.nickname?.type === 'minLength' && (
                  <span className={style.signUp__textError}>
                    Минимальная длина 2 буквы
                  </span>
                )}
                {errors.nickname?.type === 'checkNicknameValidate' && (
                  <span className={style.signUp__textError}>
                    nickname уже занят
                  </span>
                )}
              </div>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="text"
                  name="firstname"
                  title="Имя"
                  style={{
                    borderColor: errors.firstname ? 'red' : '',
                  }}
                  {...register('firstname', {
                    required: true,
                    minLength: 2,
                    pattern: /^[А-Яа-яЁёa-zA-Z]+$/,
                  })}
                />
                {errors.firstname?.type === 'required' && (
                  <span className={style.signUp__textError}>Введите имя</span>
                )}
                {errors.firstname?.type === 'minLength' && (
                  <span className={style.signUp__textError}>
                    Минимальная длина 2 буквы
                  </span>
                )}
                {errors.firstname?.type === 'pattern' && (
                  <span className={style.signUp__textError}>
                    Имя должно состоять из букв
                  </span>
                )}
              </div>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="password"
                  name="password"
                  title="Пароль"
                  style={{
                    borderColor: errors.password ? 'red' : '',
                  }}
                  {...register('password', {
                    required: true,
                    minLength: 8,
                  })}
                />
                {errors.password?.type === 'required' && (
                  <span className={style.signUp__textError}>
                    Введите пароль
                  </span>
                )}
                {errors.password?.type === 'minLength' && (
                  <span className={style.signUp__textError}>
                    Минимальная длина 8 букв
                  </span>
                )}
              </div>
            </div>
            <div className={style.signUp__column}>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="email"
                  name="email"
                  title="email"
                  style={{
                    borderColor: errors.email ? 'red' : '',
                  }}
                  {...register('email', {
                    required: true,
                    pattern: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                    validate: {
                      checkEmailValidate: async (v) => {
                        const data = await checkEmail(v);
                        return !data;
                      },
                    },
                  })}
                />
                {errors.email?.type === 'required' && (
                  <span className={style.signUp__textError}>Введите email</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span className={style.signUp__textError}>
                    Некорректный email
                  </span>
                )}
                {errors.email?.type === 'checkEmailValidate' && (
                  <span className={style.signUp__textError}>
                    email уже зарегистрирован
                  </span>
                )}
              </div>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="text"
                  name="lastname"
                  title="Фамилия"
                  style={{
                    borderColor: errors.lastname ? 'red' : '',
                  }}
                  {...register('lastname', {
                    required: true,
                    minLength: 2,
                    pattern: /^[А-Яа-яЁёa-zA-Z]+$/,
                  })}
                />
                {errors.lastname?.type === 'required' && (
                  <span className={style.signUp__textError}>
                    Введите фамилию
                  </span>
                )}
                {errors.lastname?.type === 'minLength' && (
                  <span className={style.signUp__textError}>
                    Минимальная длина 2 буквы
                  </span>
                )}
                {errors.lastname?.type === 'pattern' && (
                  <span className={style.signUp__textError}>
                    Фамилия должна состоять из букв
                  </span>
                )}
              </div>
              <div className={style.signUp__input}>
                <RegisterInput
                  type="password"
                  name="repeatedPassword"
                  title="Повторите пароль"
                  style={{
                    borderColor: errors.repeatedPassword ? 'red' : '',
                  }}
                  {...register('repeatedPassword', {
                    required: true,
                    minLength: 8,
                    validate: {
                      passwordMismatch: (v) => v === watch('password'),
                    },
                  })}
                />
                {errors.repeatedPassword?.type === 'required' && (
                  <span className={style.signUp__textError}>
                    Повторите пароль
                  </span>
                )}
                {errors.repeatedPassword?.type === 'minLength' && (
                  <span className={style.signUp__textError}>
                    Минимальная длина 8 букв
                  </span>
                )}
                {errors.repeatedPassword?.type === 'passwordMismatch' && (
                  <span className={style.signUp__textError}>
                    Пароли не совпадают
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={style.signUp__boxButton}>
            <RegisterButton>Зарегистрироваться</RegisterButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
