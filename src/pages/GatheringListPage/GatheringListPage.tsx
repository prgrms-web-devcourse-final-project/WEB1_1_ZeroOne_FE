// GatheringListPage.tsx
import styles from './GatheringListPage.module.scss';

import { SidebarFilter, PROJECT_CATEGORIES } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>프로젝트</h1>
      <div className={styles.contentContainer}>
        <div className={styles.sidebarWrapper}>
          <aside className={styles.sidebarContainer}>
            <SidebarFilter categories={PROJECT_CATEGORIES} />
          </aside>
        </div>
        <div className={styles.mainContent}>
          <GatheringSelectCon />
          <GatheringGrid />
        </div>
      </div>
    </div>
  );
};
