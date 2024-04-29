import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from './CardSkeleton.module.scss';

function CardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className={style.cardSkeleton__card} key={i}>
        <Skeleton borderRadius={0} height={300} />
        <div className={style.cardSkeleton__cardText}>
          <Skeleton height={16} width="50%" />
          <Skeleton height={16} />
          <div className={style.cardSkeleton__cardTextColumns}>
            <div className={style.cardSkeleton__cardTextLeftColumn}>
              <Skeleton height={16} width={44} />
            </div>
            <div className={style.cardSkeleton__cardTextRightColumn}>
              <Skeleton height={16} width={36} />
            </div>
          </div>
        </div>
      </div>
    ));
}

export default CardSkeleton;
