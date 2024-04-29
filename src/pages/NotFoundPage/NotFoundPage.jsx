import { Helmet } from 'react-helmet';
import React from 'react';
import style from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={style.notFoundPage}>
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <div className={style.notFoundPage__error}>404</div>
      <h1 className={style.notFoundPage__title}>Страница не найдена</h1>
      <p className={style.notFoundPage__text}>
        Неправильно набран адрес или такой страницы не существует
      </p>
    </div>
  );
}

export default NotFoundPage;
