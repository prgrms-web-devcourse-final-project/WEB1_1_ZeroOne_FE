import styles from './LikeTab.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { PortFolioGrid } from '../PortfolioGrid/PortFolioGrid';

import { useLikeArchiveList } from '@/features';
import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { Loader, TripleDot } from '@/shared/ui';

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

export const LikeTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['포트폴리오', '아카이브', '게더링'];

  const {
    items: likeArchives,
    isLoading: isArchiveLoading,
    isFetchingNextPage,
    ref,
  } = useLikeArchiveList();

  const renderingLikeTap = (activeTab: string) => {
    if (activeTab === '포트폴리오') {
      return <PortFolioGrid />;
    } else if (activeTab === '아카이브') {
      if (!likeArchives || isArchiveLoading) {
        return <Loader />;
      }
      return (
        <>
          <ArchiveGrid archives={likeArchives} />
          <div className={styles.loading} ref={ref}>
            {isFetchingNextPage && <TripleDot />}
          </div>
        </>
      );
    } else if (activeTab === '게더링') {
      return <GatheringGrid items={dummyGatherings} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabList}>
        {tabs.map(tab => (
          <li
            className={activeTab === tab ? styles.active : ''}
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      {renderingLikeTap(activeTab)}
    </div>
  );
};
