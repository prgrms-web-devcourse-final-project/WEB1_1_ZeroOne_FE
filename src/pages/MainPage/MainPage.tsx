import styles from './MainPage.module.scss';

import { MainBanner } from '@/widgets';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <MainBanner />
    </div>
  );
};
