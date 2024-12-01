// GatheringListPage.tsx
import styles from './GatheringListPage.module.scss';

import { useGatheringList } from '@/features/gathering/api/gathering.hook';
import { SidebarFilter, PROJECT_CATEGORIES } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

export const GatheringListPage = () => {
  const {
    items,
    //  isLoading, isError,
    ref,
    isFetchingNextPage,
  } = useGatheringList('모집중');

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading gatherings</div>;

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
          <GatheringGrid items={items} />
          <div className={styles.loading} ref={ref}>
            {isFetchingNextPage && <div>Loading more...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
