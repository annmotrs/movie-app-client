import MoonLoader from 'react-spinners/MoonLoader';
import { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { UserContext } from './context/UserContext';
import MainPage from './pages/MainPage/MainPage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import Layout from './comnonents/Layout/Layout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './global.scss';
import { checkAuth } from './http/userAPI';
import RequireAuth from './hoc/RequireAuth';
import RequireUnauth from './hoc/RequireUnauth';
import { getFavorites } from './http/favoriteAPI';
import { ThemeContext } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { setUser, setAuth, setFavoritesByUser } = useContext(UserContext);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(true);

  useLayoutEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    checkAuth()
      .then((data) => {
        setUser(data);
        setAuth(true);
        return getFavorites(data.id);
      })
      .then((favorites) => {
        setFavoritesByUser(favorites);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div
        className="loading"
        style={{
          backgroundColor: theme === 'dark' ? '#1c1c1c' : '#e6e5e5',
        }}
      >
        <MoonLoader color={'#ad36bd'} loading={isLoading} size={80} />
      </div>
    );
  }

  return (
    <SkeletonTheme
      baseColor={theme === 'dark' ? '#202020' : '#ebebeb'}
      highlightColor={theme === 'dark' ? '#444' : '#f5f5f5'}
    >
      <>
        <ScrollToTop />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="movies" element={<MoviesPage />} />
              <Route path="movies/:id" element={<MoviePage />} />
              <Route
                path="favorite"
                element={
                  <RequireAuth>
                    <FavoritePage />
                  </RequireAuth>
                }
              />
              <Route
                path="signin"
                element={
                  <RequireUnauth>
                    <SignInPage />
                  </RequireUnauth>
                }
              />
              <Route
                path="signup"
                element={
                  <RequireUnauth>
                    <SignUpPage />
                  </RequireUnauth>
                }
              />
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <UserProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </>
    </SkeletonTheme>
  );
}

export default App;
