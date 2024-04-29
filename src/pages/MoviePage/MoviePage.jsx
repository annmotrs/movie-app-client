import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Helmet } from 'react-helmet';
import { FaStar } from 'react-icons/fa6';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { MdOutlineFavorite } from 'react-icons/md';
import style from './MoviePage.module.scss';
import Error from '../../comnonents/Error/Error';
import NavigationButton from '../../comnonents/UI/NavigationButton/NavigationButton';
import movieService from '../../services/movie.service';
import { UserContext } from '../../context/UserContext';
import { addFavorite, deleteFavorite } from '../../http/favoriteAPI';

function MoviePage() {
  const { id } = useParams();
  const { isAuth, user, favoritesByUser, setFavoritesByUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(false);
  const [infoFavorite, setInfoFavorite] = useState({});

  useEffect(() => {
    if (isAuth) {
      const favorite = favoritesByUser.find(
        (favorite) => favorite.movie_id === +id
      );
      if (favorite) {
        setFavorite(true);
        setInfoFavorite(favorite);
      }
    }
  }, []);

  async function toggleFavorite() {
    if (isAuth) {
      if (isFavorite) {
        const id = infoFavorite.id;
        const data = await deleteFavorite(id);
        if (data === 1) {
          setFavorite(false);
          setInfoFavorite({});
          setFavoritesByUser(
            favoritesByUser.filter((favorite) => favorite.id !== id)
          );
        }
      } else {
        const data = await addFavorite(user.id, +id);
        setFavorite(true);
        setInfoFavorite(data);
        setFavoritesByUser([...favoritesByUser, data]);
      }
    } else {
      navigate('/signin');
    }
  }

  const {
    isPending: movieIsPending,
    error: movieError,
    data: movie,
  } = useQuery({
    queryKey: ['movie'],
    queryFn: () => movieService.getById(id),
    select: ({ data }) => data,
  });

  const {
    isPending: staffIsPending,
    error: staffError,
    data: staff,
  } = useQuery({
    queryKey: ['staff'],
    queryFn: () => movieService.getStaffOfMovie(id),
    select: ({ data }) => data,
  });

  if (movieError) {
    return <Error message={movieError.message} />;
  }

  return (
    <div className={style.moviePage}>
      <Helmet>
        <title>{movieIsPending ? 'Фильм' : movie?.nameRu}</title>
      </Helmet>
      <div
        className={style.moviePage__backgroundImage}
        style={{
          backgroundImage:
            movieIsPending || !movie?.coverUrl
              ? 'linear-gradient(#01014b, #007aff)'
              : `url(${movie.coverUrl})`,
        }}
      ></div>
      <div className="moviePage__wrapper container">
        <div className={style.moviePage__mainInfoContent}>
          <div className={style.moviePage__mainInfoText}>
            <h1 className={style.moviePage__mainInfoTitle}>
              {movie?.nameRu || <Skeleton width="50%" />}
            </h1>
            {movieIsPending ? (
              <Skeleton />
            ) : (
              <div className={style.moviePage__mainInfoParams}>
                {movie?.ratingImdb && (
                  <div className={style.moviePage__mainInfoParam}>
                    <FaStar color="orange" /> {movie?.ratingImdb}
                  </div>
                )}
                {movie?.filmLength && (
                  <div className={style.moviePage__mainInfoParam}>
                    {movie?.filmLength > 59
                      ? `${Math.floor(movie.filmLength / 60)} ч ${
                          movie?.filmLength % 60
                        } мин`
                      : `${movie?.filmLength} мин`}
                  </div>
                )}
                <div className={style.moviePage__mainInfoParam}>
                  {movie?.year}
                </div>
              </div>
            )}
            <div className={style.moviePage__mainInfoGenres}>
              {movie?.genres.map((genre) => genre.genre).join(', ') || (
                <Skeleton />
              )}
            </div>
            <div className={style.moviePage__buttons}>
              {movieIsPending ? (
                <Skeleton borderRadius={30} height={42} width={255} />
              ) : (
                <NavigationButton to={movie?.webUrl} target="_blank">
                  <FaRegCirclePlay size="20" />
                  Смотреть фильм
                </NavigationButton>
              )}
              {movieIsPending ? (
                <Skeleton circle height={42} width={42} />
              ) : (
                <button
                  className={style.moviePage__buttonFavorite}
                  onClick={toggleFavorite}
                >
                  <MdOutlineFavorite color={isFavorite ? 'red' : '#afafaf'} />
                </button>
              )}
            </div>
          </div>
          <div className={style.moviePage__mainInfoBoxImage}>
            {movieIsPending ? (
              <Skeleton width={208} height={308} />
            ) : (
              <img src={movie?.posterUrl} alt={movie?.nameRu} />
            )}
          </div>
        </div>
        <div className={style.moviePage__secondaryInfoContent}>
          <div className={style.moviePage__secondaryInfoDescription}>
            <div className={style.moviePage__secondaryInfoTitle}>Описание</div>
            <div className={style.moviePage__secondaryInfoText}>
              {movieIsPending ? (
                <Skeleton count={5} />
              ) : movie?.description ? (
                movie?.description
              ) : (
                'Описание фильма не добавлено.'
              )}
            </div>
          </div>

          <div className={style.moviePage__secondaryInfoListOfActors}>
            <div className={style.moviePage__secondaryInfoTitle}>В ролях</div>
            <div className={style.moviePage__secondaryInfoText}>
              {staffIsPending ? (
                <Skeleton count={5} />
              ) : staffError ? (
                'Не удалось получить данные.'
              ) : (
                staff
                  .filter((person) => person.professionText === 'Актеры')
                  .map((person) => {
                    return person.nameRu;
                  })
                  .slice(0, 30)
                  .join(', ')
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
