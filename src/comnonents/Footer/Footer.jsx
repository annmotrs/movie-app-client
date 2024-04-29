import { SlSocialVkontakte, SlSocialYoutube } from 'react-icons/sl';
import { PiTelegramLogo } from 'react-icons/pi';
import '../../global.scss';
import style from './Footer.module.scss';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className="footer__wrapper container">
        <div className={style.footer__socialIcons}>
          <div className={style.footer__socialIcon}>
            <a href="#!">
              <SlSocialVkontakte />
            </a>
          </div>
          <div className={style.footer__socialIcon}>
            <a href="#!">
              <PiTelegramLogo />
            </a>
          </div>
          <div className={style.footer__socialIcon}>
            <a href="#!">
              <SlSocialYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
