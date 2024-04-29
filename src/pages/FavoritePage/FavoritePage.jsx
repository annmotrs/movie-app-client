import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from '../../comnonents/CardSkeleton/CardSkeleton';
import style from './FavoritePage.module.scss';
import NavigationButton from '../../comnonents/UI/NavigationButton/NavigationButton';
import Error from '../../comnonents/Error/Error';
import MovieCard from '../../comnonents/MovieCard/MovieCard';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import movieService from '../../services/movie.service';

function FavoritePage() {
  const { favoritesByUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  async function getMovies() {
    const datas = await Promise.all(
      favoritesByUser.map(async (favorite) => {
        const { data } = await movieService.getById(favorite.movie_id);
        return data;
      })
    );
    const updatedTotalPages = Math.ceil(datas.length / limit);
    setTotalPages(updatedTotalPages);
    if (page > updatedTotalPages) {
      setPage(updatedTotalPages);
    }
    return datas;
  }

  const {
    isPending,
    error,
    data: movies,
  } = useQuery({
    queryKey: ['favoriteMovies', favoritesByUser],
    queryFn: getMovies,
    placeholderData: keepPreviousData,
  });

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="favoritePage">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <div className="favoritePage__wrapper container">
        <h1 className="title">Избранное</h1>
        {favoritesByUser.length > 0 ? (
          <>
            <div className={style.favoritePage__cards}>
              {isPending ? (
                <CardSkeleton cards={20} />
              ) : (
                movies
                  .slice(page * limit - limit, page * limit)
                  .map((movie) => (
                    <MovieCard key={movie.kinopoiskId} movie={movie} />
                  ))
              )}
            </div>
            {favoritesByUser.length > limit && (
              <div className={style.favoritePage__pagination}>
                {isPending ? (
                  <Skeleton borderRadius={30} height={42} width={140} />
                ) : (
                  <NavigationButton
                    onClick={() => {
                      setPage(Math.max(page - 1, 1));
                      window.scrollTo(0, 0);
                    }}
                    style={{
                      pointerEvents: page === 1 ? 'none' : 'auto',
                      opacity: page === 1 ? '0.5' : '1',
                    }}
                  >
                    <FaArrowLeft />
                    Назад
                  </NavigationButton>
                )}
                {isPending ? (
                  <Skeleton borderRadius={30} height={42} width={137} />
                ) : (
                  <NavigationButton
                    onClick={() => {
                      if (totalPages > page) {
                        setPage(page + 1);
                        window.scrollTo(0, 0);
                      }
                    }}
                    style={{
                      pointerEvents: page === totalPages ? 'none' : 'auto',
                      opacity: page === totalPages ? '0.5' : '1',
                    }}
                  >
                    Далее
                    <FaArrowRight />
                  </NavigationButton>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={style.favoritePage__textNotFound}>
            В "Избранном" ничего нет.
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePage;
