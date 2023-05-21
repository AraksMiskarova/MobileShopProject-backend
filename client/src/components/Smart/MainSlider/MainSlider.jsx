import { React } from 'react';
import Slider from 'react-slick';
import { useMediaQuery } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainSlider.module.scss';

function MainSlider() {
  const dotsDisabled = true;

  const isMobile = useMediaQuery('(max-width:1300px)');

  return (
    <Slider
      dots={dotsDisabled}
      infinite="true"
      speed={2000}
      slidesToShow={!isMobile ? 2 : 1}
      slidesToScroll={1}
      autoplay="true"
      autoplaySpeed={5000}
      arrows={false}
      className={style.slick_slider}
      dotsClass={style['slick-dots']}
    >
      <div className={style.slick_slide}>
        <img src="/Slide1.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/Slide2.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/Slide3.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/Slide4.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/Slide5.jpg" alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src="/Slide6.jpg" alt="2" />
      </div>
    </Slider>
  );
}

export default MainSlider;
