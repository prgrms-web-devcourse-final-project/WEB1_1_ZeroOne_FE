import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import styles from './SearchTap.module.scss';
import { SearchAll } from '../SearchAll/SearchAll';

import type { ArchiveCardDTO, Color } from '@/features';
import type { GatheringItem } from '@/features/gathering/model/dto/gathering.dto';

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

const dummyGatherings: GatheringItem[] = Array.from({ length: 9 }, (_, i) => ({
  gatheringId: i,
  title: `Sample Gathering ${i + 1}`,
  userId: i,
  username: '홍길동',
  sort: '프로젝트',
  subject: '개발', // ProjectSubjectType만 허용
  tags: ['React', 'TypeScript', 'Next.js'],
  deadLine: '2024-11-28',
  position: ['개발자', '디자이너'], // 여러 포지션 가능
  contactType: '온라인',
  period: '3개월',
  personnel: '3',
}));

const renderingSearchTap = (activeTab: string, setActiveTab: (t: string) => void) => {
  if (activeTab === '전체') {
    return (
      <SearchAll
        archives={dummyArchives.slice(0, 4)}
        gatherings={dummyGatherings.slice(0, 4)}
        setActiveTab={setActiveTab}
      />
    );
  } else if (activeTab === '아카이브') {
    return <ArchiveGrid archives={dummyArchives} />;
  } else if (activeTab === '게더링') {
    return <GatheringGrid items={dummyGatherings} />;
  }
};

export const SearchTap = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['전체', '아카이브', '게더링'];

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
