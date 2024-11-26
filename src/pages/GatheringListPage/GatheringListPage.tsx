// GatheringListPage.tsx
import styles from './GatheringListPage.module.scss';
import { PROJECT_CATEGORIES } from '../../shared/ui/SidebarFilter/config/constants';

import { SidebarFilter } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.h1}>프로젝트(64)</h1>
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
