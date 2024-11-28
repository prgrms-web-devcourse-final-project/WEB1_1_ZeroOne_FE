import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import styles from './SearchTap.module.scss';
import { SearchAll } from '../SearchAll/SearchAll';

import type { ArchiveCardDTO, Color } from '@/features';
import type { GatheringCardProps } from '@/shared/ui/GatheringCard';

const dummyArchives: ArchiveCardDTO[] = Array.from({ length: 9 }, (_, i) => ({
  archiveId: i,
  title: `Sample Archive`,
  introduction: `Description for sample archive`,
  type: ['red', 'blue', 'green', 'yellow', 'purple'][Math.floor(Math.random() * 4)] as Color,
  username: '홍길동',
  likeCount: Math.floor(Math.random() * 100),
  isLiked: Math.random() > 0.5,
  thumbnail: 'https://picsum.photos/300/200',
  createDate: new Date(),
}));

const dummyGaatherings: GatheringCardProps[] = Array.from({ length: 9 }, () => ({
  title: `Sample Gathering`,
  name: `Sample Name`,
  introduction: `Description for sample gathering`,
  tag: ['tag1', 'tag2', 'tag3'],
  deadline: '2024-11-28',
}));

const renderingSearchTap = (activeTab: string, setActiveTab: (t: string) => void) => {
  if (activeTab === '전체') {
    return (
      <SearchAll
        archives={dummyArchives.slice(0, 4)}
        gatherings={dummyGaatherings.slice(0, 4)}
        setActiveTab={setActiveTab}
      />
    );
  } else if (activeTab === '아카이브') {
    return <ArchiveGrid archives={dummyArchives} />;
  } else if (activeTab === '소모임') {
    return <GatheringGrid />;
  }
};

export const SearchTap = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['전체', '아카이브', '소모임'];

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
      {renderingSearchTap(activeTab, setActiveTab)}
    </div>
  );
};
