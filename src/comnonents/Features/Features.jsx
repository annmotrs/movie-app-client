import { HiOutlineCollection } from 'react-icons/hi';
import { TbFreeRights } from 'react-icons/tb';
import { FaDesktop } from 'react-icons/fa';
import style from './Features.module.scss';

function Features() {
  return (
    <section className="features">
      <div className="features__wrapper container">
        <h1 className="title">Преимущества</h1>
        <div className={style.features__cards}>
          <div className={style.features__card}>
            <div className={style.features__cardIcon}>
              <HiOutlineCollection />
            </div>
            <div className={style.features__cardText}>
              Большая коллекция фильмов
            </div>
          </div>
          <div className={style.features__card}>
            <div className={style.features__cardIcon}>
              <TbFreeRights />
            </div>
            <div className={style.features__cardText}>
              Полностью бесплатный контент
            </div>
          </div>
          <div className={style.features__card}>
            <div className={style.features__cardIcon}>
              <FaDesktop />
            </div>
            <div className={style.features__cardText}>
              Простой интерфейс сайта
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
