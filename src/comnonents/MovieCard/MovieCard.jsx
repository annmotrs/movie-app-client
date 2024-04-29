import { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineFavorite } from 'react-icons/md';
import style from './MovieCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { addFavorite, deleteFavorite } from '../../http/favoriteAPI';

function MovieCard({ movie }) {
  const { isAuth, user, favoritesByUser, setFavoritesByUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [isFavorite, setFavorite] = useState(false);
  const [infoFavorite, setInfoFavorite] = useState({});

  useEffect(() => {
    if (isAuth) {
      const favorite = favoritesByUser.find(
        (favorite) => favorite.movie_id === movie.kinopoiskId
      );
      if (favorite) {
        setFavorite(true);
        setInfoFavorite(favorite);
      }
    } else {
      setFavorite(false);
      setInfoFavorite({});
    }
  }, [isAuth, favoritesByUser]);

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
        const data = await addFavorite(user.id, movie.kinopoiskId);
        setFavorite(true);
        setInfoFavorite(data);
        setFavoritesByUser([...favoritesByUser, data]);
      }
    } else {
      navigate('/signin');
    }
  }

  return (
    <div className={style.movieCard__card}>
      <div
        className={style.movieCard__cardBoxFavorite}
        onClick={toggleFavorite}
      >
        <button className={style.movieCard__cardButtonFavorite}>
          <MdOutlineFavorite color={isFavorite ? 'red' : '#afafaf'} />
        </button>
      </div>
      <Link
        to={`/movies/${movie.kinopoiskId}`}
        className={style.movieCard__cardLink}
      >
        <div className={style.movieCard__cardBoxImage}>
          <img
            className={style.movieCard__cardImage}
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
          />
        </div>
        <div className={style.movieCard__cardInfo}>
          <div className={style.movieCard__cardTitle}>{movie.nameRu}</div>
          <div className={style.movieCard__cardGenres}>
            {movie.genres.map((genre) => genre.genre).join(', ')}
          </div>
          <div className={style.movieCard__cardIcons}>
            <div className={style.movieCard__cardRating}>
              {movie.ratingImdb && <FaStar color="orange" />}{' '}
              {movie?.ratingImdb}
            </div>
            <div className={style.movieCard__cardYear}>{movie.year}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
