import styles from './MainBanner.module.scss';

import Banner from '@/shared/assets/banner.svg?react';

export const MainBanner = () => {
  return (
    <div className={styles.container}>
      <h2>팔레트에서 자신의 경력과 경험을 소개해주세요</h2>
      <Banner className={styles.bannerSvg} />
      <p className={styles.description}>소개 문구</p>
      <span>PALETTEE</span>
    </div>
  );
};
