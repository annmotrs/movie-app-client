import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CardSkeleton from '../../comnonents/CardSkeleton/CardSkeleton';
import Error from '../../comnonents/Error/Error';
import FilterButton from '../../comnonents/UI/FilterButton/FilterButton';
import style from './MoviesPage.module.scss';
import NavigationButton from '../../comnonents/UI/NavigationButton/NavigationButton';
import MovieCard from '../../comnonents/MovieCard/MovieCard';
import movieService from '../../services/movie.service';

function MoviesPage() {
  const [isShowGenres, setIsShowGenres] = useState(false);
  const [params, setParams] = useState({ page: 1, genre: null, keyword: '' });

  const {
    isPending: moviesIsPending,
    error: moviesError,
    data: movies,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['movies', params.page, params.genre, params.keyword],
    queryFn: () =>
      movieService.getAll(params.page, params.genre, params.keyword),
    placeholderData: keepPreviousData,
    select: ({ data }) => data,
  });

  const {
    isPending: genresIsPending,
    error: genresError,
    data: genres,
  } = useQuery({
    queryKey: ['genres'],
    queryFn: () => movieService.getFilters(),
    select: ({ data }) => data,
  });

  if (moviesError) {
    return <Error message={moviesError.message} />;
  }

  return (
    <div className="moviesPage">
      <Helmet>
        <title>Фильмы</title>
      </Helmet>
      <div className="moviesPage__wrapper container">
        <h1 className="title">Фильмы</h1>
        <div className={style.moviesPage__oneRowFilter}>
          <div className={style.moviesPage__search}>
            <div className={style.moviesPage__searchIcon}>
              <FaSearch />
            </div>
            <input
              type="search"
              className={style.moviesPage__searchInput}
              placeholder="Поиск"
              value={params.keyword}
              onChange={(e) => {
                setParams({ keyword: e.target.value, genre: null, page: 1 });
              }}
            />
          </div>
        </div>
        {genresIsPending ? (
          <Skeleton width={225} style={{ marginBottom: 20 }} />
        ) : genresError ? (
          ''
        ) : (
          <>
            <button
              className={style.moviesPage__toggleGenres}
              onClick={() => setIsShowGenres(!isShowGenres)}
            >
              Фильтрация по жанрам{' '}
              {isShowGenres ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            <div
              className={style.moviesPage__twoRowFilter}
              style={{ display: isShowGenres ? 'flex' : 'none' }}
            >
              <FilterButton
                isActive={params.genre}
                id={null}
                onClick={() => {
                  setParams({ ...params, genre: null, page: 1 });
                }}
              >
                Все
              </FilterButton>
              {genres.genres.slice(0, 20).map((g) => (
                <FilterButton
                  key={g.id}
                  isActive={params.genre}
                  id={g.id}
                  onClick={() => {
                    setParams({ ...params, genre: g.id, page: 1 });
                  }}
                >
                  {g.genre.charAt(0).toUpperCase() + g.genre.slice(1)}
                </FilterButton>
              ))}
            </div>
          </>
        )}
        {moviesIsPending || movies?.items?.length > 0 ? (
          <>
            <div className={style.moviesPage__cards}>
              {moviesIsPending ? (
                <CardSkeleton cards={20} />
              ) : (
                movies?.items.map((movie) => (
                  <MovieCard key={movie.kinopoiskId} movie={movie} />
                ))
              )}
            </div>
            <div className={style.moviesPage__pagination}>
              {moviesIsPending ? (
                <Skeleton borderRadius={30} height={42} width={140} />
              ) : (
                <NavigationButton
                  onClick={() => {
                    setParams({
                      ...params,
                      page: Math.max(params.page - 1, 1),
                    });
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    pointerEvents: params.page === 1 ? 'none' : 'auto',
                    opacity: params.page === 1 ? '0.5' : '1',
                  }}
                >
                  <FaArrowLeft />
                  Назад
                </NavigationButton>
              )}
              {moviesIsPending ? (
                <Skeleton borderRadius={30} height={42} width={137} />
              ) : (
                <NavigationButton
                  onClick={() => {
                    if (!isPlaceholderData && movies.totalPages > params.page) {
                      setParams({ ...params, page: params.page + 1 });
                      window.scrollTo(0, 0);
                    }
                  }}
                  style={{
                    pointerEvents:
                      params.page === movies.totalPages ? 'none' : 'auto',
                    opacity: params.page === movies.totalPages ? '0.5' : '1',
                  }}
                >
                  Далее
                  <FaArrowRight />
                </NavigationButton>
              )}
            </div>
          </>
        ) : (
          <div className={style.moviesPage__textNotFound}>
            По данному запросу ничего не найдено.
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;
