import styles from './LikeTab.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { PortFolioGrid } from '../PortfolioGrid/PortFolioGrid';

import type { ArchiveCardDTO, Color } from '@/features';

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

const renderingLikeTap = (activeTab: string) => {
  if (activeTab === '포트폴리오') {
    return <PortFolioGrid />;
  } else if (activeTab === '아카이브') {
    return <ArchiveGrid archives={dummyArchives} />;
  } else if (activeTab === '게더링') {
    return <GatheringGrid />;
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
