import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { useUserTab } from './hook/useUserTab';

import type { ColorCountDTO } from '@/features';
import { ColorMap, useUserArchiveColors, useUserArchiveList } from '@/features';
import type { GatheringItemDto } from '@/features/gathering/model/gathering.dto';
import { Loader } from '@/shared/ui';
import { PieChart } from '@/shared/ui/Chart/PieChart';

interface ArchiveContentProps {
  userId: number;
}

const ArchiveContent = ({ userId }: ArchiveContentProps) => {
  const { items: archives, isFetchingNextPage, isPending, ref } = useUserArchiveList(userId);
  const { data: colorData, isPending: isColorPending } = useUserArchiveColors(userId);

  if (!colorData?.data || isColorPending || isPending) {
    return <Loader />;
  }

  const convertToChartData = (data: ColorCountDTO) =>
    Object.entries(data).map(([color, value]) => ({
      id: color,
      value,
      label: color.toLocaleLowerCase(),
      color: ColorMap[color as keyof typeof ColorMap].hex,
    }));

  return (
    <div className={styles.colorTrendWrapper}>
      <div className={styles.colorTrendContainer}>
        <h2>나의 아카이브 현황</h2>
        <div>
          <PieChart data={convertToChartData(colorData.data)} />
        </div>
      </div>
      <ArchiveGrid archives={archives} isMine />
      <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
    </div>
  );
};

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

const GatheringContent = () => <GatheringGrid items={dummyGatherings} />;

const ContentComponents = {
  gathering: GatheringContent,
  archive: ArchiveContent,
};

interface UserContentsProps {
  userId: number;
}

export const UserContents = ({ userId }: UserContentsProps) => {
  const { activeTab, isActive, setActiveTab } = useUserTab();

  const ContentComponent = ContentComponents[activeTab];

  return (
    <section className={styles.userContentSection}>
      <ContentsTab isActive={isActive} setActiveTab={setActiveTab} />

      <div className={styles.sectionContents}>
        <ContentComponent userId={userId} />
      </div>
    </section>
  );
};
