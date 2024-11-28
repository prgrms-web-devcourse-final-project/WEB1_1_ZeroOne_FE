import styles from './PortFolioGrid.module.scss';

import { PortfolioCard } from '@/features';
export const PortFolioGrid = () => {
  return (
    <div className={styles.container}>
      <PortfolioCard />
    </div>
  );
};
