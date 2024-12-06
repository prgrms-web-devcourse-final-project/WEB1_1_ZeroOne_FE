import styles from './MainContents.module.scss';
import { MainGridItem } from '../MainGridItem/MainGridItem';

export const MainContents = () => {
  return (
    <div className={styles.container}>
      <MainGridItem type='portfolio' />
      <MainGridItem type='archive' />
      <MainGridItem type='gathering' />
    </div>
  );
};
