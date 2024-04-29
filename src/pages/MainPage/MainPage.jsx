import { Helmet } from 'react-helmet';
import About from '../../comnonents/About/About';
import Banner from '../../comnonents/Banner/Banner';
import Features from '../../comnonents/Features/Features';
import MoviePreview from '../../comnonents/MoviePreview/MoviePreview';
import style from './MainPage.module.scss';

function MainPage() {
  return (
    <main className={style.main}>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      <Banner />
      <MoviePreview />
      <About />
      <Features />
    </main>
  );
}

export default MainPage;
