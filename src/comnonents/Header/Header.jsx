import { useState, useContext, useLayoutEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiFilmSpool } from 'react-icons/gi';
import { MdOutlineFavorite } from 'react-icons/md';
import { FaSignInAlt, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { IoPerson, IoMenu, IoClose } from 'react-icons/io5';
import { UserContext } from '../../context/UserContext';
import { ThemeContext } from '../../context/ThemeContext';
import '../../global.scss';
import style from './Header.module.scss';

function Header() {
  let { isAuth, logOut } = useContext(UserContext);
  const [isActiveMenu, setActiveMenu] = useState(false);
  const { theme, updateTheme, toggleTheme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    updateTheme();
    document.body.classList.add(theme);
  }, []);

  function toggleMenu(event) {
    event.preventDefault();
    setActiveMenu(!isActiveMenu);
    document.body.classList.toggle('lock');
  }

  function closeMenu() {
    if (isActiveMenu) {
      setActiveMenu(!isActiveMenu);
      document.body.classList.toggle('lock');
    }
  }

  return (
    <header className={style.header}>
      <div className="header__wrapper container">
        <nav className={style.header__navigation}>
          <div className={style.header__logo}>
            <Link to="/">
              <GiFilmSpool size="30" color="#301906" /> Neo
              <span style={{ color: 'lightgrey' }}>films</span>
            </Link>
          </div>
          <ul
            className={style.header__siteNavigation}
            style={{ right: isActiveMenu ? '0' : '-100%' }}
          >
            <li className={style.header__siteNavigationItem}>
              <NavLink
                to="/"
                className={({ isActive }) => `${isActive ? style.active : ''}`}
                onClick={closeMenu}
              >
                Главная
              </NavLink>
            </li>
            <li className={style.header__siteNavigationItem}>
              <NavLink
                to="/movies"
                className={({ isActive }) => `${isActive ? style.active : ''}`}
                onClick={closeMenu}
              >
                Фильмы
              </NavLink>
            </li>
          </ul>
          <ul className={style.header__userNavigation}>
            <li className={style.header__userNavigationItem}>
              <button
                className={style.header__userModeButton}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <FaSun size="18" /> : <FaMoon size="18" />}
              </button>
            </li>
            {isAuth ? (
              <>
                <li className={style.header__userNavigationItem}>
                  <NavLink
                    to="/favorite"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? `${style.active} ${style.header__userNavigationIcon}`
                          : `${style.header__userNavigationIcon}`
                      }`
                    }
                  >
                    <MdOutlineFavorite size="20" />
                    <span className={style.header__userNavigationTitle}>
                      Избранное
                    </span>
                  </NavLink>
                </li>
                <li className={style.header__userNavigationItem}>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? `${style.active} ${style.header__userNavigationIcon}`
                          : `${style.header__userNavigationIcon}`
                      }`
                    }
                  >
                    <IoPerson size="20" />
                    <span className={style.header__userNavigationTitle}>
                      Профиль
                    </span>
                  </NavLink>
                </li>
                <li className={style.header__userNavigationItem}>
                  <Link
                    to="/"
                    className={style.header__userNavigationIcon}
                    onClick={logOut}
                  >
                    <FaSignOutAlt size="20" />
                    <span className={style.header__userNavigationTitle}>
                      Выйти
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <li className={style.header__userNavigationItem}>
                <Link to="/signin" className={style.header__userNavigationIcon}>
                  <FaSignInAlt size="20" />
                  <span className={style.header__userNavigationTitle}>
                    Войти
                  </span>
                </Link>
              </li>
            )}
            <li className={style.header__menu}>
              <a
                href="#!"
                className={style.header__userNavigationIcon}
                onClick={(event) => toggleMenu(event)}
              >
                {isActiveMenu ? <IoClose size="35" /> : <IoMenu size="35" />}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
