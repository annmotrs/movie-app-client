import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Error from '../Error/Error';
import NavigationButton from '../UI/NavigationButton/NavigationButton';
import style from './Banner.module.scss';
import movieService from '../../services/movie.service';

function Banner() {
  const { isPending, error, data } = useQuery({
    queryKey: ['movieBanner'],
    queryFn: () => movieService.getFirstMovie(),
    select: ({ data }) => data,
  });

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <section
      className={style.banner}
      style={{
        backgroundImage:
          isPending || !data?.coverUrl
            ? 'linear-gradient(#01014b, #007aff)'
            : `url(${data.coverUrl})`,
      }}
    >
      <div className={`${style.banner__wrapper} container`}>
        <div className={style.banner__content}>
          <h1 className={style.banner__contentTitle}>
            {data?.nameRu || <Skeleton width="50%" />}
          </h1>
          <div className={style.banner__contentDescription}>
            {isPending ? <Skeleton count={6} /> : data?.description}
          </div>
          {isPending ? (
            <Skeleton borderRadius={30} height={42} width={152} />
          ) : (
            <NavigationButton to={`movies/${data?.kinopoiskId}`}>
              Смотреть
            </NavigationButton>
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
