import { useEffect, useState } from 'react';

import styles from './UserContents.module.scss';
import { ArchiveGrid } from '../ArchiveGrid';
import { GatheringGrid } from '../GatheringGrid';
import { ContentsTab } from './ContentsTab';
import { useUserTab } from './hook/useUserTab';

import { ColorMap, useMyArchiveList } from '@/features';
import type { GatheringItem } from '@/features/gathering/model/dto/gathering.dto';
import { Loader } from '@/shared/ui';
import { PieChart } from '@/shared/ui/Chart/PieChart';

interface dataType {
  id: string;
  label: string;
  value: number;
  color: string;
}

const ArchiveContent = () => {
  const { data: myArchives, isPending } = useMyArchiveList();
  const [chartData, setChartData] = useState<dataType[]>([]);

  useEffect(() => {
    if (myArchives?.data) {
      const colors = myArchives.data.archives.reduce(
        (acc, cur) => {
          if (acc[cur.type]) {
            acc[cur.type] += 1;
          } else {
            acc[cur.type] = 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      );

      const data = Object.entries(colors).map(([color, value]) => ({
        id: color,
        value,
        color: ColorMap[color as keyof typeof ColorMap].hex,
        label: color,
      }));

      setChartData(data);
    }
  }, [myArchives]);

  if (!myArchives?.data || isPending) {
    return <Loader />;
  }
  return (
    <div className={styles.colorTrendWrapper}>
      <div className={styles.colorTrendContainer}>
        <h2>나의 아카이브 현황</h2>
        <div>
          <PieChart data={chartData} />
        </div>
      </div>
      <ArchiveGrid archives={myArchives.data?.archives} isMine />
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
