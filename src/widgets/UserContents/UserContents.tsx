import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { useUserTab } from './hook/useUserTab';

import type { ArchiveCardDTO, Color } from '@/features';
import { PieChart } from '@/shared/ui/Chart/PieChart';

//더미 데이터
const ARCHIVE_COLOR_DATA = [
  {
    id: 'red',
    value: 23,
    color: '#ff5e5e',
    label: 'red',
  },
  {
    id: 'yellow',
    value: 12,
    color: '#ffe66b',
    label: 'yellow',
  },
  {
    id: 'green',
    value: 32,
    color: '#b5d681',
    label: 'green',
  },
  {
    id: 'blue',
    value: 21,
    color: '#8ad0e2',
    label: 'blue',
  },
  {
    id: 'purple',
    value: 32,
    color: '#aa8abd',
    label: 'purple',
  },
];

//더미 데이터
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

const ArchiveContent = () => (
  <div className={styles.colorTrendWrapper}>
    <div className={styles.colorTrendContainer}>
      <h2>나의 아카이브 현황</h2>
      <div>
        <PieChart data={ARCHIVE_COLOR_DATA} />
      </div>
    </div>
    <ArchiveGrid archives={dummyArchives} />
  </div>
);

const GatheringContent = () => <GatheringGrid />;

const ContentComponents = {
  gathering: GatheringContent,
  archive: ArchiveContent,
};

export const UserContents = () => {
  const { activeTab, isActive, setActiveTab } = useUserTab();

  const ContentComponent = ContentComponents[activeTab];

  return (
    <section className={styles.userContentSection}>
      <ContentsTab isActive={isActive} setActiveTab={setActiveTab} />

      <div className={styles.sectionContents}>
        <ContentComponent />
      </div>
    </section>
  );
};
