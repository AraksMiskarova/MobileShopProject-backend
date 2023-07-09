import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';

import style from './Footer.module.scss';

import Logo from '../../UI/Logo/Logo';

function Footer() {
  return (
    <div className={style.root}>
      <div className={style.logo}>
        {' '}
        <Logo />
      </div>
      <div className={style.txt}>
        <p>
          <span>MobiStore.ua</span> is an online store of MobiStore, a Ukrainian
          chain of stores for smartphones and related products. For any
          questions, contact us by phone <span>+380 44 *** 4567</span>{' '}
          (Toll-free) or by e-mail at <span>info@MobiStore.ua</span>. We are
          always glad to see you in our stores.
        </p>
      </div>
      <div className={style.icons}>
        <InstagramIcon
          data-testid="InstagramIcon"
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <TelegramIcon
          data-testid="TelegramIcon"
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <YouTubeIcon
          data-testid="YouTubeIcon"
          color="secondary"
          style={{ fontSize: 50, marginRight: 25 }}
        />
        <EmailIcon
          data-testid="EmailIcon"
          color="secondary"
          style={{ fontSize: 50 }}
        />
      </div>
      <div className={style.address}>
        <p>Kyiv, Ukraine</p>
        <p>Vasyl Pupkin St. 10/1</p>
        <p>Work hours: 9:00am - 9:00pm</p>
        <p>© 2022–2023 MobiStore</p>
      </div>
    </div>
  );
}

export default Footer;
