// GatheringListPage.tsx
import styles from './GatheringListPage.module.scss';

import { useGatheringList } from '@/features/gathering/api/gathering.hook';
import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { SidebarFilter, PROJECT_CATEGORIES } from '@/shared/ui';
import { GatheringSelectCon, GatheringGrid } from '@/widgets';

const dummyGatherings: GatheringItemDto[] = Array.from({ length: 9 }, (_, i) => ({
  gatheringId: i.toString(),
  userId: i.toString(),
  contactType: '온라인',
  sort: '스터디',
  subject: '개발',
  period: '1개월',
  personnel: '1',
  position: ['개발자'],
  title: `Sample Gathering`,
  deadLine: '2022-12-31',
  username: '홍길동',
  tags: ['tag1', 'tag2'],
}));

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
          <GatheringGrid items={dummyGatherings} />
          <div className={styles.loading} ref={ref}>
            {/* {isFetchingNextPage && <div>Loading more...</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};
