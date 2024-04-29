# [Сайт с фильмами "Neofilms"](https://movie-app-client-mu.vercel.app/)
## О проекте
Сайт с фильмами "Neofilms" предоставляет возможность удобного просмотра информации о фильмах для того, чтобы ознакомиться с ними и в дальнейшем посмотреть их. Зарегистрированные пользователи могут добавлять заинтересовавшие их фильмы в Избранное.<br/>
Пользователи могут просматривать сайт с мобильных устройств, так как присутствует адаптив до 320px.<br/>
В данном репозитории находится клиентская часть сайта. Серверная часть - [Movie App Server](https://github.com/annmotrs/movie-app-server).
## Стек технологий
**Фронтэнд** - React, JavaScript, HTML, SCSS, React Router, Axios, React Query, React Hook Form, React Icons, React Helmet (добавление в тег head), React Spinners (индикатор загрузки страницы), React Loading Skeleton (заполнители содержания при загрузке контента).<br/>
**Бэкенд** – NodeJS, Express, JSON Web Token (авторизация), BCrypt (шифрование пароля).<br/>
**СУБД** – PostgreSQL.<br/>
Было использвано [Kinopoisk API Unofficial](https://kinopoiskapiunofficial.tech/) для получения данных о фильмах.
## Функционал сайта
Неавторизованному пользователю предоставляется следующий функционал:
1. Регистрация на сайте;
2. Авторизация на сайте;
3. Поиск по фильмам, фильтрация по жанрам и пагинация на странице с фильмами;
4. Просмотр информации о фильме;
5. Выбор тёмной или светлой темы сайта. Выбранная тема сохраняется в браузере и при повторном открытии сайта загружается автоматически.

Авторизованному пользователю доступны те же функции, что и неавторизованному пользователю, при этом добавляются следующие функции:
1. Добавление фильма в Избранное;
2. Удаление фильма из Избранного;
3. Просмотр всех избранных фильмов на странице Избранное с пагинацией;
4. Редактирование профиля.
