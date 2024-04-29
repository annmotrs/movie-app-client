import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import MovieCard from '../MovieCard/MovieCard';
import Error from '../Error/Error';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import NavigationButton from '../UI/NavigationButton/NavigationButton';
import style from './MoviePreview.module.scss';
import 'swiper/css/pagination';
import movieService from '../../services/movie.service';

function MoviePreview() {
  const { isPending, error, data } = useQuery({
    queryKey: ['moviesPrev'],
    queryFn: () => movieService.getAll(),
    select: ({ data }) => data.items,
  });

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <section className={style.moviePreview}>
      <div className="moviePreview__wrapper container">
        <div className={style.moviePreview__cards}>
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 3000 }}
            style={{ padding: '10px 15px 30px' }}
            spaceBetween={30}
            slidesPerView={5}
            pagination={{
              el: '#containerForBullets',
              type: 'bullets',
              bulletClass: 'swiper-custom-bullet',
              bulletActiveClass: 'swiper-custom-bullet-active',
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                loop: true,
              },
              460: {
                slidesPerView: 2,
                loop: true,
              },
              690: {
                slidesPerView: 3,
                loop: true,
              },
              920: {
                slidesPerView: 4,
                loop: true,
              },
              1150: {
                slidesPerView: 5,
                loop: false,
              },
            }}
          >
            {isPending
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <SwiperSlide key={i}>
                      <CardSkeleton cards={1} />
                    </SwiperSlide>
                  ))
              : data.slice(1, 6).map((movie) => (
                  <SwiperSlide key={movie.kinopoiskId}>
                    <MovieCard movie={movie} />
                  </SwiperSlide>
                ))}
          </Swiper>
          <div
            id="containerForBullets"
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              alignItems: 'center',
            }}
          ></div>
        </div>

        <div className={style.moviePreview__cardBoxButton}>
          <NavigationButton to="/movies">Смотреть больше</NavigationButton>
        </div>
      </div>
    </section>
  );
}

export default MoviePreview;
