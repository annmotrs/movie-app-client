import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { updateDataUser, checkEmail } from '../../http/userAPI.js';
import style from './UserProfilePage.module.scss';

function UserProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const [isEditFirstname, setEditFirstname] = useState(false);
  const [isEditLastname, setEditLastname] = useState(false);
  const [isEditEmail, setEditEmail] = useState(false);
  const [isCorrectPassword, setCorrectPassword] = useState(false);
  const [isEditPassword, setEditPassword] = useState(false);

  const {
    register: registerLastname,
    handleSubmit: handleSubmitLastname,
    formState: { errors: errorsLastname },
  } = useForm({ mode: 'onChange', defaultValues: { lastname: user.lastname } });

  const {
    register: registerFirstname,
    handleSubmit: handleSubmitFirstname,
    formState: { errors: errorsFirstname },
  } = useForm({
    mode: 'onChange',
    defaultValues: { firstname: user.firstname },
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: user.email },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset,
    formState: { errors: errorsPassword },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitLastname = async (data) => {
    const newData = await updateDataUser({
      ...user,
      lastname: data.lastname,
      password: '',
    });
    setUser(newData);
    setEditLastname(false);
  };

  const onSubmitFirstname = async (data) => {
    const newData = await updateDataUser({
      ...user,
      firstname: data.firstname,
      password: '',
    });
    setUser(newData);
    setEditFirstname(false);
  };

  const onSubmitEmail = async (data) => {
    const newData = await updateDataUser({
      ...user,
      email: data.email,
      password: '',
    });
    setUser(newData);
    setEditEmail(false);
  };

  const onSubmitPassword = async (data) => {
    const newData = await updateDataUser({
      ...user,
      password: data.password1,
    });
    setUser(newData);
    setCorrectPassword(false);
    reset();
  };

  return (
    <div className={style.userProfile}>
      <Helmet>
        <title>Мой профиль</title>
      </Helmet>
      <div className={style.userProfile__wrapper}>
        <h1 className={style.userProfile__title}>Мой профиль</h1>
        <div className={style.userProfile__info}>
          <div className={style.userProfile__infoTitle}>Никнейм:</div>
          <div className={style.userProfile__infoData}>{user.nickname}</div>
        </div>
        <div className={style.userProfile__info}>
          <div className={style.userProfile__infoTitle}>Фамилия:</div>
          <div className={style.userProfile__infoData}>
            {isEditLastname ? (
              <>
                <form
                  className={style.userProfile__infoDataForm}
                  onSubmit={handleSubmitLastname(onSubmitLastname)}
                >
                  <input
                    type="text"
                    className={style.userProfile__infoDataInput}
                    style={{
                      borderColor: errorsLastname.lastname ? 'red' : '',
                    }}
                    {...registerLastname('lastname', {
                      required: true,
                      minLength: 2,
                      pattern: /^[А-Яа-яЁёa-zA-Z]+$/,
                    })}
                  />
                  <button
                    type="submit"
                    className={style.userProfile__infoDataButton}
                  >
                    <FaCheck />
                  </button>
                </form>
                {errorsLastname.lastname?.type === 'required' && (
                  <span className={style.userProfile__infoDataError}>
                    Введите фамилию
                  </span>
                )}
                {errorsLastname.lastname?.type === 'minLength' && (
                  <span className={style.userProfile__infoDataError}>
                    Минимальная длина 2 буквы
                  </span>
                )}
                {errorsLastname.lastname?.type === 'pattern' && (
                  <span className={style.userProfile__infoDataError}>
                    Фамилия должна состоять из букв
                  </span>
                )}
              </>
            ) : (
              <div className={style.userProfile__infoDataForm}>
                <span className={style.userProfile__infoDataValue}>
                  {user.lastname}
                </span>
                <button
                  type="button"
                  className={style.userProfile__infoDataButton}
                  onClick={() => setEditLastname(true)}
                >
                  <MdModeEdit />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={style.userProfile__info}>
          <div className={style.userProfile__infoTitle}>Имя:</div>
          <div className={style.userProfile__infoData}>
            {isEditFirstname ? (
              <>
                <form
                  className={style.userProfile__infoDataForm}
                  onSubmit={handleSubmitFirstname(onSubmitFirstname)}
                >
                  <input
                    type="text"
                    className={style.userProfile__infoDataInput}
                    style={{
                      borderColor: errorsFirstname.firstname ? 'red' : '',
                    }}
                    {...registerFirstname('firstname', {
                      required: true,
                      minLength: 2,
                      pattern: /^[А-Яа-яЁёa-zA-Z]+$/,
                    })}
                  />
                  <button
                    type="submit"
                    className={style.userProfile__infoDataButton}
                  >
                    <FaCheck />
                  </button>
                </form>
                {errorsFirstname.firstname?.type === 'required' && (
                  <span className={style.userProfile__infoDataError}>
                    Введите имя
                  </span>
                )}
                {errorsFirstname.firstname?.type === 'minLength' && (
                  <span className={style.userProfile__infoDataError}>
                    Минимальная длина 2 буквы
                  </span>
                )}
                {errorsFirstname.firstname?.type === 'pattern' && (
                  <span className={style.userProfile__infoDataError}>
                    Имя должно состоять из букв
                  </span>
                )}
              </>
            ) : (
              <div className={style.userProfile__infoDataForm}>
                <span className={style.userProfile__infoDataValue}>
                  {user.firstname}
                </span>
                <button
                  type="button"
                  className={style.userProfile__infoDataButton}
                  onClick={() => setEditFirstname(true)}
                >
                  <MdModeEdit />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={style.userProfile__info}>
          <div className={style.userProfile__infoTitle}>email:</div>
          <div className={style.userProfile__infoData}>
            {isEditEmail ? (
              <>
                <form
                  className={style.userProfile__infoDataForm}
                  onSubmit={handleSubmitEmail(onSubmitEmail)}
                >
                  <input
                    type="text"
                    className={style.userProfile__infoDataInput}
                    style={{
                      borderColor: errorsEmail.email ? 'red' : '',
                    }}
                    {...registerEmail('email', {
                      required: true,
                      pattern:
                        /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                      validate: {
                        checkEmailValidate: async (v) => {
                          const data = await checkEmail(v);
                          return !data || v === user.email;
                        },
                      },
                    })}
                  />
                  <button
                    type="submit"
                    className={style.userProfile__infoDataButton}
                  >
                    <FaCheck />
                  </button>
                </form>
                {errorsEmail.email?.type === 'required' && (
                  <span className={style.userProfile__infoDataError}>
                    Введите email
                  </span>
                )}
                {errorsEmail.email?.type === 'pattern' && (
                  <span className={style.userProfile__infoDataError}>
                    Некорректный email
                  </span>
                )}
                {errorsEmail.email?.type === 'checkEmailValidate' && (
                  <span className={style.userProfile__infoDataError}>
                    email уже зарегистрирован
                  </span>
                )}
              </>
            ) : (
              <div className={style.userProfile__infoDataForm}>
                <span className={style.userProfile__infoDataValue}>
                  {user.email}
                </span>
                <button
                  type="button"
                  className={style.userProfile__infoDataButton}
                  onClick={() => setEditEmail(true)}
                >
                  <MdModeEdit />
                </button>
              </div>
            )}
          </div>
        </div>
        {!isEditPassword && !isCorrectPassword && (
          <button
            className={style.userProfile__buttonEditPassword}
            type="button"
            onClick={() => setEditPassword(true)}
          >
            Изменить пароль
          </button>
        )}
        {(isEditPassword || isCorrectPassword) && (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div
              className={style.userProfile__info}
              style={{ display: isEditPassword ? '' : 'none' }}
            >
              <div className={style.userProfile__infoTitle}>
                Введите новый пароль:
              </div>
              <div className={style.userProfile__infoData}>
                <div className={style.userProfile__infoDataForm}>
                  <input
                    type="password"
                    className={style.userProfile__infoDataInput}
                    style={{
                      borderColor: errorsPassword.password1 ? 'red' : '',
                    }}
                    {...registerPassword('password1', {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  <button
                    type="button"
                    className={style.userProfile__infoDataButton}
                    onClick={() => {
                      if (
                        Object.keys(errorsPassword).length === 0 &&
                        watch('password1') !== ''
                      ) {
                        setEditPassword(false);
                        setCorrectPassword(true);
                      }
                    }}
                  >
                    <FaArrowRight />
                  </button>
                </div>
                {errorsPassword.password1?.type === 'required' && (
                  <span className={style.userProfile__infoDataError}>
                    Введите пароль
                  </span>
                )}
                {errorsPassword.password1?.type === 'minLength' && (
                  <span className={style.userProfile__infoDataError}>
                    Минимальная длина 8 букв
                  </span>
                )}
              </div>
            </div>

            <div
              className={style.userProfile__info}
              style={{ display: isCorrectPassword ? '' : 'none' }}
            >
              <div className={style.userProfile__infoTitle}>
                Повторите пароль:
              </div>
              <div className={style.userProfile__infoData}>
                <div className={style.userProfile__infoDataForm}>
                  <input
                    type="password"
                    className={style.userProfile__infoDataInput}
                    style={{
                      borderColor: errorsPassword.password2 ? 'red' : '',
                    }}
                    {...registerPassword('password2', {
                      required: true,
                      minLength: 8,
                      validate: {
                        passwordMismatch: (v) => v === watch('password1'),
                      },
                    })}
                  />
                  <button
                    type="submit"
                    className={style.userProfile__infoDataButton}
                  >
                    <FaCheck />
                  </button>
                </div>
                {errorsPassword.password2?.type === 'required' && (
                  <span className={style.userProfile__infoDataError}>
                    Повторите пароль
                  </span>
                )}
                {errorsPassword.password2?.type === 'minLength' && (
                  <span className={style.userProfile__infoDataError}>
                    Минимальная длина 8 букв
                  </span>
                )}
                {errorsPassword.password2?.type === 'passwordMismatch' && (
                  <span className={style.userProfile__infoDataError}>
                    Пароли не совпадают
                  </span>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
