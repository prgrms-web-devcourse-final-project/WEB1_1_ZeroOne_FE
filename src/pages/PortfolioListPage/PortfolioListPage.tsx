import styles from './PortfolioListPage.module.scss';

import { JOB_CATEGORIES } from '@/shared/model';
import { SidebarFilter } from '@/shared/ui';

export const PortfolioListPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>포트폴리오</h1>
      <div className={styles.contentContainer}>
        <div className={styles.sidebarWrapper}>
          <aside className={styles.sidebarContainer}>
            <SidebarFilter categories={JOB_CATEGORIES} />
          </aside>
        </div>
        <div className={styles.mainContent}></div>
      </div>
    </div>
  );
};
