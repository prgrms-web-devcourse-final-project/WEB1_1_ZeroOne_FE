import styles from './MainPage.module.scss';

import { MainBanner, MainContents } from '@/widgets';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <MainBanner />
      <MainContents />
    </div>
  );
};
