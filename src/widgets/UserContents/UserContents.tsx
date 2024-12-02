import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { useUserTab } from './hook/useUserTab';

import type { ArchiveCardDTO, Color } from '@/features';
import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
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

const dummyGatherings: GatheringItemDto<'프로젝트'>[] = Array.from({ length: 9 }, (_, i) => ({
  gatheringId: i.toString(),
  title: `Sample Gathering ${i + 1}`,
  userId: `user_${i}`,
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
const GatheringContent = () => <GatheringGrid items={dummyGatherings} />;

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
