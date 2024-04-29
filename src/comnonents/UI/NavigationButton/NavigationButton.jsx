import { Link } from 'react-router-dom';
import style from './NavigationButton.module.scss';

function NavigationButton({ children, ...props }) {
  return (
    <Link className={style.navigationButton} {...props}>
      {children}
    </Link>
  );
}

export default NavigationButton;
