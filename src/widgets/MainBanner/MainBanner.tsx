import Slider from 'react-slick';

import styles from './MainBanner.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Blue from '@/shared/assets/banner/blue.svg?react';
import Green from '@/shared/assets/banner/green.svg?react';
import Purple from '@/shared/assets/banner/purple.svg?react';
import Red from '@/shared/assets/banner/red.svg?react';
import Yellow from '@/shared/assets/banner/yellow.svg?react';

export const MainBanner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: false,
  };
  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.sliderWrapper}>
        <Red className={styles.banner} />
        <Yellow className={styles.banner} />
        <Blue className={styles.banner} />
        <Green className={styles.banner} />
        <Purple className={styles.banner} />
      </Slider>
    </div>
  );
};
