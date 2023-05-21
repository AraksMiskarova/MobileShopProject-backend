import { React } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ListCard from '../ListCard/ListCard';

import style from './CardSlider.module.scss';

function CardSlider() {
  const dotsDisabled = true;

  return (
    <>
      <h2 className={style.title}>Top seller this month!</h2>
      <Slider
        dots={!dotsDisabled}
        infinite="true"
        speed={2000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay="true"
        autoplaySpeed={5000}
        arrows={!dotsDisabled}
        className={style.slick_slider}
      >
        <ListCard />
        <ListCard />
        <ListCard />
      </Slider>
    </>
  );
}

export default CardSlider;
