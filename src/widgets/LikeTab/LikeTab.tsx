import styles from './LikeTab.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { PortFolioGrid } from '../PortfolioGrid/PortFolioGrid';

import type { ArchiveCardDTO, Color } from '@/features';
import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';

const dummyArchives: ArchiveCardDTO[] = Array.from({ length: 9 }, (_, i) => ({
  archiveId: i,
  title: `Sample Archive`,
  introduction: `Description for sample archive`,
  type: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE'][Math.floor(Math.random() * 4)] as Color,
  username: '홍길동',
  likeCount: Math.floor(Math.random() * 100),
  isLiked: Math.random() > 0.5,
  imageUrl: 'https://picsum.photos/300/200',
  createDate: '2024-12-03',
}));

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

const renderingLikeTap = (activeTab: string) => {
  if (activeTab === '포트폴리오') {
    return <PortFolioGrid />;
  } else if (activeTab === '아카이브') {
    return <ArchiveGrid archives={dummyArchives} />;
  } else if (activeTab === '게더링') {
    return <GatheringGrid items={dummyGatherings} />;
  }
};

export const LikeTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) => {
  const tabs = ['포트폴리오', '아카이브', '게더링'];

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
